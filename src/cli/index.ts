import { config as allConfig, type Command, type Config, type Options, type Opts } from "./config"
import { validadeArg } from "@/utils/validade-args"
import { getSettings, type Settings } from "./get/setttings"
import { select, confirm } from '@inquirer/prompts';
import { print, printError } from "@/utils/print";
import { hasKeyProperty, isObject } from "@/utils/is-object";

type Args = Command | 'select' | 'init' | null

export class vsc {
  private config = allConfig
  private settings: {} | Promise<Settings> | Settings | Error = {}
  private arg: Args = 'select'
  private filePath = '.vscode/settings.json'

  private async initializeSettings() {
    this.settings = await getSettings();
  }
  /**
   * @param argv Bun.argv
  */
  constructor(argv: string[]) {
    this.initializeSettings();
    this.arg = validadeArg(argv)
  }

  get = {
    command: () => {
      return this.arg
    },
    key: () => {
      return this.config[this.get.index()].key
    },
    message: () => {
      return this.config[this.get.index()].message
    },
    index: () => {
      return this.config.findIndex((c) => c.command === this.arg)
    },
    options: () => {
      return this.config[this.get.index()].options
    },
    config: () => {
      return this.config[this.get.index()]
    },
    settings: async () => {
      this.settings = await getSettings()
      return this.settings
    }
  }

  async run() {
    await this.get.settings()
    if(this.arg) {
      if (this.arg === 'select') return this.select()
      if (this.arg === 'init') return this.init()
      await this.add.settings()
      await this.add.file()
    } else {
      printError('Ocorreu um error no Run')
      return 
    }
  }

  
  async select() {
    this.arg = await select({
      message: 'Selecione o que deseja alterar?',
      choices: this.config.map((c) => ({
        name: c.name,
        description: c.description,
        value: c.command,
      }))
    })
    await this.add.settings()
    await this.add.file()
    return 
  }

  async init() {
    this.arg = 'autoSave'
    await this.add.settings()
    this.arg = 'theme'
    await this.add.settings()
    this.arg = 'icon'
    await this.add.settings()
    
    await this.add.file()
    return
  }

  add = {
    file: async () => {
      await Bun.write(this.filePath, JSON.stringify(this.settings, null, 2))
      .then(() => console.log('Configuraçãoes adicionadas!'))
    },
    settings: async () => {
      const options = this.get.options() as Options

      if (Array.isArray(options)) {
        const hasKey = options.some(option => hasKeyProperty(option) && option.key)
        const opts = options as Opts
        if (hasKey) {
          const key = await select({
            message: this.get.message(),
            choices: opts.map((o) => ({
              name: o.name,
              description: o.description,
              value: o.key
            }))
          })
          const { value } = opts.find((o) => o.key = key) as Opts[number]

          if (!key) return printError('Não veio key')

          if(isObject(key)) {
            ;(this.settings as Settings)[this.get.key()][key] = value
            return

          } else {
            const { defualtValues } = this.get.config() as Config[number]
            if(defualtValues) {
              ;(this.settings as Settings)[this.get.key()] = defualtValues
              ;(this.settings as Settings)[this.get.key()][key] = value
            } else {
              ;(this.settings as Settings)[this.get.key()] = { [key]: value }
            }
            print('Aidna não é um objeto')
            return
          }
        }
      }

      if (options === 'boolean') {
        const result = await confirm({
          message: this.get.message(),
          default: true
        });(this.settings as Settings)[this.get.key()] = result
        return
      }
      const confg = await select({
        message: this.get.message(),
        choices: options.map((o) => ({
          name: o.name,
          description: o.description,
          value: o.value,
        }))
      });(this.settings as Settings)[this.get.key()] = confg
      
        // this.settings[this.get.key()] = confg
      }    
  }
}

 