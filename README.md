# theme-switch
## Tutorial de uso

para ultilizar basta criar uma nova instancia de SwitchTheme, passando no construtor o tema padrão da seguinte maneira

```javascript
const theme = new SwitchTheme({
  '--primary': '#07334a',
  '--text-color': '#f0faff',
  '--border-color': '#7bdcfe'
});
```

feito isso, você pode cadastrar novos temas 
```javascript
theme.registerTheme('tema-claro', {
  '--primary': '#b9eafe',
  '--text-color': '#07334a',
  '--border-color': '#7bdcfe'
})

theme.registerTheme('tema-escuro', {
  '--primary': 'pink',
  '--text-color': 'black',
  '--border-color': 'green'
}) 
```

Para trocar de tema, deve-se usar o metodo useTheme passando o nome do tema pra qual deseja mudar
```javascript
    theme.useTheme('tema-escuro');
```

Se desejar voltar para o tema padrão é só chamar o metodo useTheme novamente sem passar nenhum parametro
```javascript
    theme.useTheme();
```
