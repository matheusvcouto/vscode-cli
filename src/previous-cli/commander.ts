import { parseArgs } from "node:util";

const ListComands = [
  'theme', 
  'init', 
  'icon', 
  'save',
  'sv'
] as const

type Comanders = typeof ListComands[number]

async function getCommand() {
  const { positionals } = parseArgs({
    args: Bun.argv,
    strict: true,
    allowPositionals: true,
  })
  
  const command = positionals[2]
  
  let result = ListComands.find(cmd => cmd === command) ?? null
  
  if (command === undefined) { 
    result = 'init' // if none comes, it will be equal to init
  }

  if (result === 'sv') {
    result = 'save'
  }

  return result
}


export {
  getCommand,
  ListComands,
  type Comanders
}
