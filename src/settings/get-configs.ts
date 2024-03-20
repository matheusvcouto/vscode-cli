import { select, confirm } from '@inquirer/prompts';
import { colorThemes, iconsTheme } from '@/settings'
import { defaultSettings } from '@/settings'

const getNewConfig = async () => {
  const settings = defaultSettings

  const autoSave = await confirm({
    message: "Auto save files? "
  }).then((result) => {
    if (result === true) {
      return 'afterDelay'
    }
    return 'off'
  })
  settings['files.autoSave'] = autoSave

  const colorTheme = await select({
    message: "Please choose a colorTheme: ",
    choices: colorThemes
  })
  settings['workbench.colorTheme'] = colorTheme

  const iconTheme = await select({
    message: "Please choose a iconTheme: ",
    choices: iconsTheme
  })
  settings['workbench.iconTheme'] = iconTheme

 return settings
}

const newTheme = async () => {
  const colorTheme = await select({
    message: "Please choose a colorTheme: ",
    choices: colorThemes
  })
  return { 'workbench.colorTheme': colorTheme } 

}

const newIconTheme = async () => {
  const iconTheme = await select({
    message: "Please choose a iconTheme: ",
    choices: iconsTheme
  })

 return {'workbench.iconTheme': iconTheme}
}

const newAutoSaveConfig = async () => {
  const autoSave = await confirm({
    message: "Auto save files? "
  }).then((result) => {
    if (result === true) {
      return 'afterDelay'
    }
    return 'off'
  })

 return {"files.autoSave": autoSave}
}

const getFilesExlude = async () => {
  const filesExclude = await select({
    message: "Please choose a iconTheme: ",
    choices: [
      {
        name: 'node_modules',
        value: 'node_modules'
      }, 
      {
        name: '.venv',
        value: '.venv'
      }
    ]
  })
  const base = '**/'
  const file = base.concat(filesExclude)
  return { "files.exclude": { [file]: true} }
}

export {
  getNewConfig,
  newIconTheme,
  newAutoSaveConfig,
  getFilesExlude,
  newTheme,
}