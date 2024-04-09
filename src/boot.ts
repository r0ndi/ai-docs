import { handleError } from './helpers/error-handler'
import * as assistentService from './services/assistent'

process.on('unhandledRejection', handleError)

async function main() {
  const question = 'Example question from user'
  const response = await assistentService.getAssistentAnswer(question)

  console.log('======= ======= Response ======= =======')
  console.log(response.message)

  console.log('======= ======= Sources ======= =======')
  console.log(response.sources.join('\n'))
}

main()