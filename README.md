# vscode

Esse projeto surgiu com a nescessidade de diferentes temas e configurações para determinados projetos utilizando o vscode.

To install dependencies:

```bash
bun install
```

Para testar: 

```bash
bun cli
```

Para compilar em binario:
Gerar binario independente com bun

```bash
bun compile
```
[Single-file executable](https://bun.sh/docs/bundler/executables)

adicionar no ~/zshrc
```bash
# Adicionar o caminho para o arquivo compolado
alias vsc='~/scripts/vscode/index'
```
comandos:
vsc theme => mudar o thema
vsc icon => mudar o thema de icone
vsc sv || save => alterar o salvamento automatico
vsc || vsc init => para alterar todas as configs

This project was created using `bun init` in bun v1.0.30. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
