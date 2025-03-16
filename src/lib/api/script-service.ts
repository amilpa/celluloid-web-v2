import axios from 'axios'

interface ScriptParams {
  title: string
  genre: string
  logline: string
  centralMessage: string
  abstract: string
  characterDetails: {
    main_character_profiles: unknown
    supporting_character_profiles: unknown
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
    console.log('Generating script with params:', params)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const response = await axios.post(
      `${import.meta.env.VITE_SCRIPT_AGENT}/script-agent/`,
      {
        title: params.title,
        genre: params.genre,
        logline: params.logline,
        central_message: params.centralMessage,
        abstract: params.abstract,
        main_character_profiles:
          params.characterDetails.main_character_profiles,
        supporting_character_profiles:
          params.characterDetails.supporting_character_profiles,
      }
    )

    console.log('response from script agent', response)

    // For demo purposes, return a mock response
    // In a real implementation, this would call a backend API with the CrewAI framework
    return {
      status: 'success',
      title: `The world`,
      synopsis: `A man`,
      script: 'Hello world',
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
const formatScript = (params: ScriptParams): string => {
  // format the script based on the input parameters
  const script = ''
  return script
}
