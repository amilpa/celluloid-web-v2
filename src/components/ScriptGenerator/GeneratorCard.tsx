import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { generateScript } from '@/lib/api/script-service'
import {
  TextareaField,
  SelectField,
  InputField,
} from '@/components/ui/form-elements'
import { toast } from '@/components/ui/use-toast'
import ScriptDisplay from '@/components/ScriptDisplay'

import LoadingOverlay from '../LoadingOverlay'

import { AxiosResponse } from 'axios'

import './animation.css'

const genres = [
  { value: 'action', label: 'Action' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'drama', label: 'Drama' },
  { value: 'thriller', label: 'Thriller' },
  { value: 'sci-fi', label: 'Science Fiction' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'horror', label: 'Horror' },
  { value: 'romance', label: 'Romance' },
]

const tones = [
  { value: 'dramatic', label: 'Dramatic' },
  { value: 'comedic', label: 'Comedic' },
  { value: 'suspenseful', label: 'Suspenseful' },
  { value: 'inspiring', label: 'Inspiring' },
  { value: 'dark', label: 'Dark' },
  { value: 'lighthearted', label: 'Lighthearted' },
  { value: 'satirical', label: 'Satirical' },
  { value: 'poignant', label: 'Poignant' },
]

interface CharacterDetails {
  main_characters: []
  supporting_characters: []
}
interface GeneratorCardProps {
  onNext: () => void
  logline: string
  abstract: string
  centralMessage: string
  genre: string
  characters: string
  title: string
  setLogline: (value: string) => void
  setAbstract: (value: string) => void
  setCentralMessage: (value: string) => void
  setGenre: (value: string) => void
  setCharacters: (value: string) => void
  setCurrentStep: (value: number) => void
  setTitle: (value: string) => void
  currentStep: number
  className: string
  loading: boolean
  characterDetails?: {
    main_character_profiles: unknown
    supporting_character_profiles: []
  }
  getCharacterDetails?: () => Promise<AxiosResponse<CharacterDetails, unknown>>
}

export const GeneratorCard: React.FC<GeneratorCardProps> = ({
  onNext,
  logline,
  abstract,
  centralMessage,
  genre,
  characters,
  title,
  setLogline,
  setAbstract,
  setCentralMessage,
  setGenre,
  setCurrentStep,
  setCharacters,
  setTitle,
  currentStep,
  className,
  loading,
  getCharacterDetails,
}) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [scriptResult, setScriptResult] = useState<null | {
    title: string
    script: string
    synopsis: string
  }>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    switch (name) {
      case 'logline':
        setLogline(value)
        break
      case 'abstract':
        setAbstract(value)
        break
      case 'centralMessage':
        setCentralMessage(value)
        break
      case 'characters':
        setCharacters(value)
        break
      default:
        break
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === 'genre') {
      setGenre(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form only on submission
    if (
      !logline.trim() ||
      !characters.trim() ||
      !abstract.trim() ||
      !genre ||
      !centralMessage.trim()
    ) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      })
      return
    }

    setIsGenerating(true)
    setScriptResult(null)

    try {
      const characterDetailsResponse = await getCharacterDetails()
      const characterDetailsCurrent = characterDetailsResponse.data
      console.log('characterDetailsCurrent', characterDetailsCurrent)
      const result = await generateScript({
        title: title,
        genre,
        logline,
        centralMessage,
        abstract,
        characterDetails: {
          main_character_profiles: characterDetailsCurrent.main_characters,
          // main_character_profiles: [],
          supporting_character_profiles:
            characterDetailsCurrent.supporting_characters,
          // supporting_character_profiles: [],
        },
      })

      if (result.status === 'success') {
        setScriptResult({
          title: result.title,
          script: result.script,
          synopsis: result.synopsis,
        })
        toast({
          title: 'Script generated',
          description: 'Your script has been successfully created',
        })
      } else {
        toast({
          title: 'Error',
          description: result.message || 'Failed to generate script',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const resetForm = () => {
    setScriptResult(null)

    // reset every state
    setCurrentStep(1)
    setLogline('')
    setAbstract('')
    setCentralMessage('')
    setGenre('')
    setCharacters('')

    window.scrollTo({
      top: document.getElementById('create')?.offsetTop || 0,
      behavior: 'smooth',
    })
  }

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return abstract.trim() !== ''
      case 2:
        return logline.trim() !== '' && abstract.trim() !== ''
      case 3:
        return (
          logline.trim() !== '' &&
          abstract.trim() !== '' &&
          centralMessage.trim() !== ''
        )
      case 4:
        return (
          logline.trim() !== '' &&
          abstract.trim() !== '' &&
          centralMessage.trim() !== '' &&
          characters.trim() !== ''
        )
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep()) {
      // scroll to top of page
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      onNext()
    } else {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields for this step',
        variant: 'destructive',
      })
    }
  }

  return (
    <section
      id="create"
      className={`${scriptResult ? 'pb-20' : 'pb-20 pt-4'} mt-8`}
    >
      <LoadingOverlay isVisible={isGenerating} />
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className={`${scriptResult ? 'hidden' : ''}`}>
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-medium mb-4">
                Create Your Script
              </h2>
              <p className="text-muted-foreground text-lg">
                Let our AI crew transform your ideas into a professional
                screenplay
              </p>
            </div>
          </div>

          {scriptResult ? (
            <div className="flex flex-col items-center justify-center">
              <>
                <ScriptDisplay
                  title={scriptResult.title}
                  synopsis={scriptResult.synopsis}
                  script={scriptResult.script}
                />
                <div className="mt-8 flex justify-center">
                  <Button onClick={resetForm} size="lg">
                    Create Another Script
                  </Button>
                </div>
              </>
            </div>
          ) : (
            <>
              {loading && (
                <div className="flex justify-center items-center mt-44">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              )}
              <div className={`glass-card p-6 md:p-8 ${className}`}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {currentStep === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                      <InputField
                        label="Title"
                        id="title"
                        name="title"
                        placeholder="Title of your story"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                      <SelectField
                        label="Genre"
                        options={genres}
                        value={genre}
                        onChange={(value) => handleSelectChange('genre', value)}
                      />
                      <TextareaField
                        label="Premise"
                        id="premise"
                        name="abstract"
                        placeholder="Briefly describe your story concept"
                        value={abstract}
                        onChange={handleInputChange}
                        helperText="What is your story about? Give a brief summary of the main plot."
                        rows={3}
                      />
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="grid grid-cols-1 gap-6">
                      <InputField
                        label="Title"
                        id="title"
                        name="title"
                        placeholder="Title of your story"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectField
                          label="Genre"
                          options={genres}
                          value={genre}
                          onChange={(value) =>
                            handleSelectChange('genre', value)
                          }
                        />
                      </div>
                      <TextareaField
                        label="Logline"
                        id="logline"
                        name="logline"
                        placeholder="Briefly describe your story concept"
                        value={logline}
                        onChange={handleInputChange}
                        rows={3}
                      />
                      <TextareaField
                        label="Premise"
                        id="premise"
                        name="abstract"
                        placeholder="Briefly describe your story concept"
                        value={abstract}
                        onChange={handleInputChange}
                        helperText="What is your story about? Give a brief summary of the main plot."
                        rows={3}
                        className="col-span-2"
                      />
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="grid grid-cols-1 gap-6">
                      <InputField
                        label="Title"
                        id="title"
                        name="title"
                        placeholder="Title of your story"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectField
                          label="Genre"
                          options={genres}
                          value={genre}
                          onChange={(value) =>
                            handleSelectChange('genre', value)
                          }
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <TextareaField
                          label="Logline"
                          id="logline"
                          name="logline"
                          placeholder="Briefly describe your story concept"
                          value={logline}
                          onChange={handleInputChange}
                          rows={3}
                        />
                        <TextareaField
                          label="Premise"
                          id="premise"
                          name="abstract"
                          placeholder="Briefly describe your story concept"
                          value={abstract}
                          onChange={handleInputChange}
                          helperText="What is your story about? Give a brief summary of the main plot."
                          rows={3}
                          className="col-span-2"
                        />
                        <TextareaField
                          label="Central Message"
                          id="centralMessage"
                          name="centralMessage"
                          placeholder="What is the central message or theme of your story?"
                          value={centralMessage}
                          onChange={handleInputChange}
                          helperText="E.g., 'Love conquers all', 'Good triumphs over evil'"
                          rows={3}
                        />
                        <TextareaField
                          label="Characters"
                          id="characters"
                          name="characters"
                          placeholder="List main characters, separated by commas"
                          value={characters}
                          onChange={handleInputChange}
                          helperText="E.g., John - detective who investigates a murder"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center mt-6 pt-4">
                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        size="lg"
                        onClick={handleNext}
                        className="w-full md:w-auto"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isGenerating}
                        className="w-full md:w-auto"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating Script...
                          </>
                        ) : (
                          'Generate Script'
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default GeneratorCard
