# vscode

This project aims to streamline the swift exchange of specific themes and configurations for various projects within VSCode, providing a command-line interface (CLI) for a nimble and efficient customization experience.

Este projeto visa facilitar a rápida troca de temas e configurações específicas para diversos projetos no VSCode, oferecendo uma interface de linha de comando (CLI) para uma experiência ágil e eficiente de personalização.

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
