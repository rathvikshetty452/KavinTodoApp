import React from 'react'
import TMHome from './Components/TMHome'
import { initializeIcons } from '@fluentui/react';

const App = () => {
  initializeIcons();
  return (
    <div>
    <TMHome/>
    </div>
  )
}

export default App