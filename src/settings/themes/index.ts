type Themes = {
  name: string;
  value: string;
  description?: string;
}[]

const colorThemes: Themes = [
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

const iconsTheme: Themes = [
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

export { colorThemes, iconsTheme, type Themes, type IconsTheme, type ColorThemes }