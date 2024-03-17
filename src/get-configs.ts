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

export {
  getNewConfig,
  newIconTheme,
  newAutoSaveConfig,
  newTheme,
}