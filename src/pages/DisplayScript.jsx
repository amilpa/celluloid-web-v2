import React, { useEffect, useState } from 'react'
import ScriptDisplay from '../components/ScriptDisplay'
import Header from '../components/Header'

import { useSearchParams } from 'react-router-dom'

import { scriptProjects } from '../lib/projectData'

export default function DisplayScript() {
  const [searchParams] = useSearchParams()
  const scriptId = searchParams.get('id')

  const [fileContent, setFileContent] = useState('Hello world')

  // Use find instead of forEach
  const script = scriptProjects.find((rec) => rec.id === parseInt(scriptId))

  // Only access properties if script exists (prevents errors)
  const title = script ? script.title : 'Script not found'
  const synopsis = 'A tense horror thriller'

  useEffect(() => {
    window.scrollTo({
      top: document.getElementById('create')?.offsetTop || 0,
      behavior: 'smooth',
    })
    fetch('/script-text.txt')
      .then((response) => response.text())
      .then((text) => setFileContent(text))
      .catch((error) => console.error('Error loading file:', error))
  }, [])

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center">
        <ScriptDisplay title={title} synopsis={synopsis} script={fileContent} />
      </div>
    </div>
  )
}
