import { getNewConfig, newIconTheme, newTheme, newAutoSaveConfig } from '@/settings/get-configs'
import { colorThemes, iconsTheme } from './themes'
export * from './themes'

type Settings = { [key: string]: any }

const defaultSettings = {
  "files.autoSave": "afterDelay",
  "workbench.colorTheme": colorThemes[0].value,
  "workbench.iconTheme": iconsTheme[0].value
} satisfies Settings


const getSettings = async () => {
  const result = await getNewConfig()
  return result
}

const getTheme = async () => {
  const result = await newTheme()
  return result
}

const getIconTheme = async () => {
  const result = await newIconTheme()
  return result
}

const getAutoSaveConfg = async () => {
  const result = await newAutoSaveConfig()
  return result
}

const getFilesExclude = async () => {
  const result = await newAutoSaveConfig()
  return result
}

export {
  defaultSettings,
  type Settings,
  getIconTheme,
  getSettings,
  getTheme,
  getAutoSaveConfg,
}