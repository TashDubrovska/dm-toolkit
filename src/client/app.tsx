import React from 'react'
import { render } from 'react-dom'

import FogOfWar from './FogOfWar'

window.onload = () => {
  render(<FogOfWar />, document.getElementById('app'))
}
