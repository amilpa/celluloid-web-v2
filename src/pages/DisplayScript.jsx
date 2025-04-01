import React, { useEffect, useState } from 'react'
import ScriptDisplay from '../components/ScriptDisplay'
import Header from '../components/Header'
import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { scriptProjects } from '@/lib/projectData'

import { db } from '@/lib/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

export default function DisplayScript() {
  const [searchParams] = useSearchParams()
  const scriptId = searchParams.get('id')

  const [fileContent, setFileContent] = useState('Loading...')
  const [firebaseData, setFirebaseData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

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

    const loadScript = async () => {
      setIsLoading(true)

      try {
        // Fetch static script file
        const response = await fetch('/script-text.txt')
        const text = await response.text()
        setFileContent(text)

        // Check whether query param contains fetch param as firebase
        const firebaseParam = searchParams.get('fetch')
        if (firebaseParam) {
          const docRef = doc(db, 'scripts', scriptId)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            setFirebaseData(docSnap.data())
            console.log('Document data:', docSnap.data())
          } else {
            console.log('No such document!')
          }
        }
      } catch (error) {
        console.error('Error loading script data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadScript()
  }, [scriptId, searchParams])

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center absolute inset-0">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading script...</p>
          </div>
        ) : (
          <ScriptDisplay
            title={firebaseData.title || title}
            synopsis={firebaseData.logline || synopsis}
            script={firebaseData.script || fileContent}
          />
        )}
      </div>
    </div>
  )
}
