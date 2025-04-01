import React, { useEffect, useState } from 'react'
import ScriptDisplay from '../components/ScriptDisplay'
import Header from '../components/Header'

import { useSearchParams } from 'react-router-dom'

import { scriptProjects } from '@/lib/projectData'

import { db } from '@/lib/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

export default function DisplayScript() {
  const [searchParams] = useSearchParams()
  const scriptId = searchParams.get('id')

  const [fileContent, setFileContent] = useState('Loading...')

  const [firebaseData, setFirebaseData] = useState({})

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

    // check whether query param contains fetch param as firebase
    const firebaseParam = searchParams.get('firebase')
    if (firebaseParam) {
      const docRef = doc(db, 'scripts', scriptId)
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setFirebaseData(docSnap.data())
            console.log('Document data:', docSnap.data())
          } else {
            console.log('No such document!')
          }
        })
        .catch((error) => {
          console.error('Error getting document:', error)
        })
    }
  }, [])

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center">
        <ScriptDisplay
          title={firebaseData.title || title}
          synopsis={firebaseData.logline || synopsis}
          script={firebaseData.script || fileContent}
        />
      </div>
    </div>
  )
}
