import React, { StatelessComponent } from 'react'

import FogOfWar from '../components/FogOfWar'
import { InitiativeOrder } from '../components/InitiativeOrder'

import './_style.scss'

const App: StatelessComponent = () => (
  <div className="battle">
    <div className="battle__map">
      <FogOfWar />
    </div>
    <div className="battle__initiative">
      <InitiativeOrder />
    </div>
  </div>
)

export default App
