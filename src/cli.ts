import { Glob, $ } from "bun"
import { getAutoSaveConfg, getIconTheme, getSettings, getTheme } from "@/settings"
import { getCommand, ListComands } from "@/commander"

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

  } else {
    const newSettigs = await getSettings() as unknown as Settings
    for (const key of Object.keys(newSettigs)) {
      settings[key] = newSettigs[key]    
    }
  }

  await Bun.write(filePath, JSON.stringify(settings, null, 2))
}
run()
// console.log(settings)