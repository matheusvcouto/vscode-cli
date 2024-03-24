import chalk from "chalk"

export const print = (...data: any[]) => console.log(...data)
export const printError = (...data: any[]) => console.log(chalk.red('Error:', ...data))