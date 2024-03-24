import type { Opts } from "@/cli/config"


const colorThemes: Opts = [
  {
    name: "Min Dark",
    value: "Min Dark",
    description: ''
  },
  {
    name: 'Vesper',
    value: 'Vesper',
    description: '',
  },
  {
    name: "Rosé Pine (no italics)",
    value: "Rosé Pine (no italics)",
    description: '',
  },
  {
    name: "CodeSandbox",
    value: "CodeSandbox",
    description: ''
  },
  {
    name: "GitHub Dark Colorblind (Beta)",
    value: "GitHub Dark Colorblind (Beta)",
    description: ''
  }
]

type ColorThemes = typeof colorThemes[number]

const iconsTheme: Opts = [
  {
    name: 'Material icon theme',
    value: "material-icon-theme",
    description: '',
  },
  {
    name: "Symbols",
    value: "symbols",
    description: '',
  }
]

type IconsTheme = typeof colorThemes[number]

export { colorThemes, iconsTheme, type Opts, type IconsTheme, type ColorThemes }