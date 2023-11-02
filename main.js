class AnimationTransition {
  #elementsContainer = document.querySelectorAll(`
  div, header, section, footer, nav, aside, body
  `)

  #elementsText = document.querySelectorAll(`
  h1, h2, h3, h4, h5, h6, p, span, a, li, ul, ol
  `);

  constructor() {
    this.#elementsContainer.forEach(html => {
      html.style.transition = 'background ease-in 300ms'
    });

    this.#elementsText.forEach(html => {
      html.style.transition = 'color ease-in 300ms'
    })
  }
}


class RecordThemeToLocalStorage {
  /**
  * Guarda o valor do ultimo tema usado
  * @param {string} recordedTheme
  */
  recordedTheme;

  constructor() {
  }

  /**
  * @description Salva o tema no localStorage
  * @param {string} nameTheme
  */
  saveTheme(nameTheme) {
    localStorage.setItem('theme', nameTheme);
  }

  /**
 * @description Busca o tema do localStorage e salva em recordedTheme
 * @param {string} nameTheme
 */
  getTheme() {
    if (localStorage.getItem('theme')) {
      this.recordedTheme = localStorage.getItem('theme');
    }
  }

  /**
 * @description Apaga o tema do localStorage
 * @param {string} nameTheme
 */
  clearRecordedTheme() {
    localStorage.clear();
  }
}

class SwitchTheme extends RecordThemeToLocalStorage {
  defaultTheme;
  themes = [];
  html;

  /**
  * Inicializa o gerenciamento de tema recebendo um tema como padrão
  * @param {object} theme
  * @example
  * // exemplo de uso
  * const theme = new SwitchTheme({
  *   'bg-color': '#0000',
  *   'text-color': #F5F5F5
  * });
  */
  constructor(theme) {
    super();
    new AnimationTransition();

    this.html = document.querySelector('html');
    this.defaultTheme = theme;
    this.#startTheme();
  }

  /**
   * @function start
   * @description inicia o gerenciamento de tema, o tema definido no constructor sera ultilizado como
   * padrao
   */
  #startTheme() {
    Object.entries(this.defaultTheme).map(theme => {
      this.html.style.setProperty(`${theme[0]}`, `${theme[1]}`)
    })
  }


  /**
  * Registrar um novo tema
  * @param {String} nameTheme
  * @param {object} theme
  * @description com uma instancia de SwitchTheme basta chamar o metodo registerTheme()
  * passando como parametro o nome do novo tema e um objeto com sua personalização
  * @example
  * theme.registerTheme('tema-claro', {
  *  '--bg-color': 'red'
  * });
  */
  registerTheme(nameTheme, theme) {
    let newTheme = {}
    newTheme[`${nameTheme}`] = theme;
    this.themes[`${nameTheme}`] = newTheme;

    this.sync()
    return
  }

  /**
* Selecionar um tema para ser ultilizado
* @param {String} nameTheme
* @description Realiza a troca pelo tema passado como parametro
* @example
* theme.useTheme('tema-escuro');
*/
  useTheme(nameTheme) {
    if (!nameTheme) {
      this.clearRecordedTheme()
      this.#startTheme();
      console.warn('tema não passado como parametrô, sera ultilizado o tema padrão');
      return
    }

    if (!this.themes[`${nameTheme}`]) {
      return
    }

    Object.entries(this.themes[`${nameTheme}`]).map(el => {
      Object.entries(el[1]).map(el => {
        this.html.style.setProperty(`${el[0]}`, `${el[1]}`);
      })
    });

    this.saveTheme(nameTheme)
  }

  sync() {
    this.getTheme();
    if(!this.recordedTheme){
      return
    }
    this.useTheme(this.recordedTheme)
  }
}
