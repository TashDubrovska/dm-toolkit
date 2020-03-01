import React from 'react'
import { render } from 'react-dom'

import FogOfWar from './FogOfWar'
import InitiativeOrder from './InitiativeOrder'

window.onload = () => {
  render(<InitiativeOrder />, document.getElementById('app'))
}
