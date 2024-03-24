import { config, type Command } from "./config"

function getIndex() {
  const [_, __, ...args] = Bun.argv
  const arg = args[0]
  if (arg === undefined) {
    return { index: null } // não veio nenhum comando
  }
  const index = config.findIndex((value) => value.command === arg)

  if (index === -1) {
    let content = ''

    for (const { command, description } of config) {
      content += command + ': ' + description + '\n'
    }
    console.log('O comando', `"${arg}"`, 'não foi encontrado')
    console.log('Comandos disponiveis: \n')
    console.log(content)

    return { error: true }
  }
  return { index }
}

const getCommand = () => {
  const { index, error } = getIndex()

  if (!error) {
    if (index === null) {
      return { cmd: 'select' }
    }
    if (index === 0 || index) {
      const { command } = config[index]
      return { cmd: command }
    }
  }
  
  return { error: true }
}

const getOptions = (cmd?: Command | 'select') => {
  if (!cmd) {
    const { index, error } = getIndex()

    if (!error) {
      if (index === null) {
        return { options: 'select' }
      }
      if (index === 0 || index) {
        const { options } = config[index]
        return { options }
      }
    }

    return { error: true }
  }

  if (cmd) {
    if (cmd === 'select') {
      const options = config
      return { options }
    }
    const index = config.findIndex((f) => f.command === cmd)
    return {options: index}
  }
  
  return { error: true }
}

const { options, error } = getOptions('select')

if (!error) {
  console.log(options)
}