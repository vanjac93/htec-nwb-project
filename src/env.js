import { Languages } from './Constants'
import envLocal from './env.local'

const env = {
  apiKey: '38920839126c4899bfee74845b32551d',
  lan: Languages.gb
}

const mergedEnvironment = {
  ...env,
  ...envLocal
}

export default mergedEnvironment