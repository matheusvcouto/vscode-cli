import { Glob, $ } from "bun"
import { getAutoSaveConfg, getIconTheme, getSettings, getTheme } from "@/settings"
import { getCommand } from "@/commander"

await $`mkdir .vscode`.quiet() // cria a pasta se não existir
await $`touch .vscode/settings.json`

const glob = new Glob("*")

const filePath = '.vscode/settings.json'

type Settings = { [key: string]: any }
let settings: Settings | null = null
let hasSettings: boolean = false

for (const file of glob.scanSync(".vscode/")) {
  if (file === 'settings.json') {
    const file = Bun.file('.vscode/settings.json')
    try {
      settings = await file.json()
      hasSettings = true
    } catch (error) {
      settings = null
      hasSettings = false
    }
  }
}
const comand = await getCommand()

if (comand === 'init') {
  if (hasSettings && settings !== null) {
    const newSettigs = await getSettings() as unknown as Settings
    for (const key of Object.keys(newSettigs)) {
      if (settings.hasOwnProperty(key)) {
        settings[key] = newSettigs[key]
      }
    }
  } else {
    const newSettigs = await getSettings()
    settings = newSettigs
  }
} else if (comand === 'theme') {
  if (hasSettings && settings !== null) {
    const theme = await getTheme() as unknown as Settings
    for (const key of Object.keys(theme)) {
      if (settings.hasOwnProperty(key)) {
        settings[key] = theme[key]
      }
    }

  } else {
    const newSettigs = await getSettings()
    settings = newSettigs
  }
} else if (comand === 'icon') {
  if (hasSettings && settings !== null) {
    const iconTheme = await getIconTheme() as unknown as Settings
    for (const key of Object.keys(iconTheme)) {
      if (settings.hasOwnProperty(key)) {
        settings[key] = iconTheme[key]
      }
    }

  } else {
    const newSettigs = await getSettings()
    settings = newSettigs
  }
} else if (comand === 'save') {
  if (hasSettings && settings !== null) {
    const configAutoSave = await getAutoSaveConfg() as unknown as Settings

    for (const key of Object.keys(configAutoSave)) {
      if (settings.hasOwnProperty(key)) {
        settings[key] = configAutoSave[key]
      }
    }

  } else {
    const newSettigs = await getSettings()
    settings = newSettigs
  }
} else {
  // não precisa adicionar o comando init
  if (hasSettings && settings !== null) {
    const newSettigs = await getSettings() as unknown as Settings
    for (const key of Object.keys(newSettigs)) {
      if (settings.hasOwnProperty(key)) {
        settings[key] = newSettigs[key]
      }
    }
  } else {
    const newSettigs = await getSettings()
    settings = newSettigs
  }
}


await Bun.write(filePath, JSON.stringify(settings, null, 2))
// console.log(settings)