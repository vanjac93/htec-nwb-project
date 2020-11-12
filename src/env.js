import { Languages } from './Constants'
// import envLocal from './env.local'

const env = {
  apiKey: '38920839126c4899bfee74845b32551d',
  lan: Languages.gb
}

let envLocal = {}

try {
  envLocal = require('./env.local')
} catch(e) {

}

const mergedEnvironment = {
  ...env,
  ...envLocal
}

export default mergedEnvironment