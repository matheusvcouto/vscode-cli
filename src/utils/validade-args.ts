import { config, type Command } from "@/cli/config"

function validadeArg(args: string[]) {
  const [_, __, ...rest] = args
  let arg = rest[0] as Command | 'select' | 'init' | null

  if (arg === undefined) {
    return arg = 'select'
  }
  if (arg === 'init') {
    return arg = 'init'
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

    return null
  }
  if (index === null) {
    return arg = 'select' 
  }
  if (index === 0 || index) {
    const { command } = config[index]
    return arg = command 
  }
  
  return null
}

export { validadeArg }