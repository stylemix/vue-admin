// We will collect language files dynamically.
// Each directory assumes language code,
// each *.js file inside these directories are message groups

const messages = {}
const modules = require.context('.', true, /[a-z]+\/[^/]+\.js/)
modules.keys().forEach(module => {
  const [, lang, group] = module.match(/([a-z]+)\/(.*)\.js/)
  messages[lang] = messages[lang] || {}
  messages[lang][group] = modules(module).default
})

export default messages
