import passportreducer from 'passport-slim-ui/src/reducer'
import passportsagas from 'passport-slim-ui/src/sagas'

import AppFactory from '../factory'
import SettingsFactory from '../settings'

const openAccessApp = (settings = {}) => {

  settings = SettingsFactory(settings)

  let sagas = settings.sagas || []
  let reducers = settings.reducers || {}

  sagas = sagas.concat(passportsagas(settings))

  settings.sagas = sagas
  settings.reducers = reducers
  return AppFactory(settings)
}

export default openAccessApp