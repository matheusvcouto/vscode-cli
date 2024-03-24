import { vsc } from "./cli"

/**
 * se não vinher nenhum comando por padrão é o select 
 */
const cli = new vsc(Bun.argv)
await cli.run()