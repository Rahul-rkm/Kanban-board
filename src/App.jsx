import { useState } from 'react'
import './App.scss'
import Board from './components/board'
import Dialog from './components/dialog'
// import mockData from './mockData'

function App() {

  return (
    <div style={{ padding: '10px' }} className="App">
      <Board />
    </div>
  )
}

export default App
