import axios from 'axios'

import { current, current_s } from '@/lib/character-inputs/sample-3.js'

import { db } from '@/lib/firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import { title } from 'process'

interface ScriptParams {
  title: string
  genre: string
  logline: string
  centralMessage: string
  abstract: string
  characterDetails: {
    main_character_profiles: []
    supporting_character_profiles: []
  }
}

interface ScriptResponse {
  title: string
  script: string
  synopsis: string
  status: 'success' | 'error'
  message?: string
}

// This is a mock implementation - in a real app, this would call a backend API
export const generateScript = async (
  params: ScriptParams
): Promise<ScriptResponse> => {
  try {
    // convert array main_character_profiles containing an object to a string
    function objectToString(obj) {
      function format(obj, prefix = '') {
        return Object.entries(obj)
          .filter(([key, value]) => typeof value !== 'object' || value === null)
          .map(([key, value]) => `${prefix}${key.replace(/_/g, ' ')}: ${value}`)
          .concat(
            Object.entries(obj)
              .filter(
                ([key, value]) => typeof value === 'object' && value !== null
              )
              .flatMap(([key, value]) =>
                format(value, `${key.replace(/_/g, ' ')} - `)
              )
          )
          .join(', ')
      }
      return format(obj)
    }

    let main_character_profiles = ''
    for (const char of params.characterDetails.main_character_profiles) {
      main_character_profiles += objectToString(char)
    }
    // for (const char of current) {
    //   main_character_profiles += objectToString(char)
    // }

    let supporting_character_profiles = ''
    params.characterDetails.supporting_character_profiles.forEach(
      (char, index) => {
        supporting_character_profiles += `${index + 1}. ${objectToString(
          char
        )}\n`
      }
    )
    // current_s.forEach((char, index) => {
    //   supporting_character_profiles += `${index + 1}. ${objectToString(char)}\n`
    // })

    const apiClient = axios.create({
      baseURL: import.meta.env.VITE_SCRIPT_AGENT,
      headers: {
        'X-API-Key': import.meta.env.VITE_SECURE,
      },
    })

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const response = await apiClient.post(
      `${import.meta.env.VITE_SCRIPT_AGENT}/script-agent/`,
      {
        title: params.title,
        genre: params.genre,
        logline: params.logline,
        central_message: params.centralMessage,
        abstract: params.abstract,
        main_character_profiles: main_character_profiles,
        supporting_charcter_profiles: supporting_character_profiles,
      }
    )

    const rawScript = response.data

    const finalScript = formatScript(rawScript)
    // For demo purposes, return a mock response
    // In a real implementation, this would call a backend API with the CrewAI framework

    const docRef = await addDoc(collection(db, 'scripts'), {
      title: params.title,
      genre: params.genre,
      logline: params.logline,
      central_message: params.centralMessage,
      abstract: params.abstract,
      main_character_profiles: main_character_profiles,
      supporting_character_profiles: supporting_character_profiles,
      script: finalScript,
    })

    return {
      status: 'success',
      title: title,
      synopsis: params.logline,
      script: finalScript,
    }
  } catch (error) {
    console.error('Error generating script:', error)
    return {
      status: 'error',
      title: '',
      script: '',
      synopsis: '',
      message: 'Failed to generate script. Please try again.',
    }
  }
}

// Simple mock script generator for demonstration
const formatScript = (script: string): string => {
  // format the script based on the input parameters

  return script
}
