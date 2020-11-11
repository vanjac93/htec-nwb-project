// @flow
import RouterComponent from './pages/RouterComponent'
import React, { useState } from 'react'
import i18n from './services/i18n'
import env from './env'

export const Context = React.createContext({
  lan: env.lan,
  handleLanguageChange: () => { },
  setLanEnabled: () => { },
  lanEnabled: true
})

function App() {
  const [lan, setLan] = useState(env.lan)
  const [lanEnabled, setLanEnabled] = useState(true)

  const handleLanguageChange = lan => {
    i18n.changeLanguage(lan.id)
    setLan(lan)
  }

  return (
    <>
      <Context.Provider
        value={{
          setLanEnabled: (enable: boolean) => setLanEnabled(enable),
          lan,
          lanEnabled,
          handleLanguageChange: handleLanguageChange
        }}>
        <RouterComponent />
      </Context.Provider>
    </>
  )
}

export default App
