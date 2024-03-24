import { colorThemes, iconsTheme } from "@/settings"

export type Opts = {
  name: string;
  key?: string | undefined
  value: string | boolean
  description: string;
}[]

export type Config = {
  name: string
  message: string
  command: string
  key: string
  options: Opts | 'boolean'
  defualtValues?: { [key: string]: any } | undefined
  description: string
}[]

export const config = [
  {
    name: 'autoSave',
    message: 'Salvamento automatico',
    command: 'autoSave',
    key: "files.autoSave",
    options: [
      {
        name: 'true',
        value: 'afterDelay',
        description: ''
      },
      {
        name: 'off',
        value: 'off',
        description: ''
      }
    ],
    description: 'Escolha seu thema',
  },
  {
    name: 'colorTheme',
    message: 'Selecionar colorTheme',
    command: 'theme',
    key: "workbench.colorTheme",
    options: colorThemes,
    description: 'Escolha seu thema',
  },
  {
    name: 'icon Theme',
    message: 'icon Theme',
    command: 'icon',
    key: "workbench.iconTheme",
    options: iconsTheme,
    description: 'Escolha seu thema de icone'
  },
  {
    name: 'Exclude Files',
    message: 'files Exclude',
    command: 'exclude',
    key: "files.exclude",
    options: [
      {
        name: 'node_modules',
        key: '**/node_modules',
        value: true,
        description: 'Ocultar a pasta node_modules',
      },
      {
        name: 'venv',
        key: '**/.venv',
        value: true,
        description: 'Ocultar a pasta venv',
      }
    ],
    description: 'Ocultar pastas do vscode',
    defualtValues: {
      "**/.git": true,
      "**/.svn": true,
      "**/.hg": true,
      "**/CVS": true,
      "**/.DS_Store": true,
      "**/Thumbs.db": true
    }
  },
  {
    name: 'Save Files no error',
    message: "Salvar arquivos quando não tiver errors?",
    command: "files.autoSaveWhenNoErrors",
    key: "files.autoSaveWhenNoErrors",
    description: " ",
    options: 'boolean'
  }
  
] as const satisfies Config

export type Settings = typeof config[number]
export type Command = Settings['command']
export type Message = Settings['message']
export type Options = Settings['options']
export type Key = Settings['key']
