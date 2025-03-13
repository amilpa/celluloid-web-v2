import React from 'react'
import ScriptDisplay from '../components/ScriptDisplay'
import Header from '../components/Header'

export default function DisplayScript() {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center">
        <ScriptDisplay
          title="Hello world"
          synopsis="Hello world"
          script="Hello world"
        />
      </div>
    </div>
  )
}
