import AppFactory from '../factory'
import SettingsFactory from '../settings'

const openAccessApp = (settings = {}) => {
  settings = SettingsFactory(settings)

  settings = Object.assign({}, settings, {
    openAccess:true
  })
  
  return AppFactory(settings)
}

export default openAccessApp