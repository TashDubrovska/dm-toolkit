import React from 'react'
import { render } from 'react-dom'

import './common/_common.scss'

import App from './App/index'

window.onload = () => {
  render(<App />, document.getElementById('app'))
}
