import { print, printError } from "@/utils/print"
import { Glob, $ } from "bun"

type Settings = { [key: string]: any }

async function getSettings() {
  await $`mkdir .vscode`.quiet() // cria a pasta se não existir
  await $`touch .vscode/settings.json`

  const glob = new Glob("*")

  type Settings = { [key: string]: any }
  let settings: Settings = {}

  for (const file of glob.scanSync(".vscode/")) {
    if (file === 'settings.json') {
      const file = Bun.file('.vscode/settings.json')
      try {
        settings = await file.json()
      } catch (error) {
        try {
          const text = await file.text()
          settings = JSON.parse(text)
        } catch (error) {
          printError('Verifique o json.')
          return new Error('')
        }
      }
    }
  }
    return settings
  }

export { getSettings, type Settings }