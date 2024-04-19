import { handleError } from './helpers/error-handler'
import * as assistentService from './services/assistent'

process.on('unhandledRejection', handleError)

async function main() {
  const query = process.argv.slice(2).join(' ')
  const response = await assistentService.getAssistentAnswer(query)

  console.log('======= ======= Response ======= =======')
  console.log(response.message)

  console.log('======= ======= Sources ======= =======')
  console.log(response.sources.join('\n'))
}

main()