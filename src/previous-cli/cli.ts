import { Glob, $ } from "bun"
import { getAutoSaveConfg, getIconTheme, getSettings, getTheme } from "@/settings"
import { parseArgs } from "node:util";
import { getFilesExlude } from "./get-configs";

await $`mkdir .vscode`.quiet() // cria a pasta se não existir
await $`touch .vscode/settings.json`

const glob = new Glob("*")

const filePath = '.vscode/settings.json'

type Settings = { [key: string]: any }
let settings: Settings = {}
let hasSettings: boolean = false

for (const file of glob.scanSync(".vscode/")) {
  if (file === 'settings.json') {
    const file = Bun.file('.vscode/settings.json')
    try {
      settings = await file.json()
      hasSettings = true
    } catch (error) {
      hasSettings = false
    }
  }
}

const ListComands = [
  'theme', 
  'init', 
  'icon', 
  'save',
  'exclude',
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


async function run() {
  const command = await getCommand()

  if(command === null) {
    console.log('❌ Comando não reconhecido')
    console.log(' ')
    console.log('Lista de comandos:', JSON.stringify(ListComands, null, 2))
    return
  }

  if (command === 'init') {
    const newSettigs = await getSettings() as unknown as Settings
    for (const key of Object.keys(newSettigs)) {
      settings[key] = newSettigs[key]    
    }

  } else if (command === 'theme') {
    const theme = await getTheme()
    settings['workbench.colorTheme'] = theme['workbench.colorTheme']

  } else if (command === 'icon') {
    const iconTheme = await getIconTheme()
    settings['workbench.iconTheme'] = iconTheme["workbench.iconTheme"]

  } else if (command === 'save') {
    const configAutoSave = await getAutoSaveConfg()
    settings['files.autoSave'] = configAutoSave['files.autoSave']

  } else if (command === 'exclude') {
    const config = await getFilesExlude()
    const [ fileExclude ] = Object.keys(config["files.exclude"])
    if (settings["files.exclude"] === undefined) {
      console.log(settings)
      settings["files.exclude"] = {
        "**/.git": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/CVS": true,
        "**/.DS_Store": true,
        "**/Thumbs.db": true
      }
      settings["files.exclude"][fileExclude] = config["files.exclude"][fileExclude]
    } else {
      settings["files.exclude"][fileExclude] = config["files.exclude"][fileExclude]
    }
    
  } else {
    // adicionar para perguntar perguntar o que deseja alterar
    const newSettigs = await getSettings() as unknown as Settings
    for (const key of Object.keys(newSettigs)) {
      settings[key] = newSettigs[key]    
    }
  }

  await Bun.write(filePath, JSON.stringify(settings, null, 2))
}
run()
// console.log(settings)