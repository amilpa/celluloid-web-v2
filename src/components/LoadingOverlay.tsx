import React, { useState, useEffect } from 'react'
import { CheckCircle, Circle, Loader } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

interface StepState {
  name: string
  description: string
  status: 'waiting' | 'in-progress' | 'completed'
}

interface LoadingOverlayProps {
  isVisible: boolean
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const scriptGenerationSteps: StepState[] = [
    {
      name: 'Act I - Setup',
      description:
        'Establishing characters, settings, and the inciting incident',
      status: 'waiting',
    },
    {
      name: 'Act II - Confrontation',
      description: 'Building conflict, obstacles, and character development',
      status: 'waiting',
    },
    {
      name: 'Act III - Resolution',
      description:
        'Creating the climax, resolving conflicts, and completing character arcs',
      status: 'waiting',
    },
    {
      name: 'Formatting Screenplay',
      description:
        'Applying industry-standard screenplay formatting and final polish',
      status: 'waiting',
    },
  ]

  useEffect(() => {
    if (!isVisible) {
      setActiveStepIndex(0)
      setProgress(0)
      return
    }

    // Create a function to update steps progressively
    const updateStepStatus = () => {
      const totalTime = 420000 // 7 minutes in milliseconds
      const timePerStep = totalTime / scriptGenerationSteps.length

      let currentStep = 0
      let progressIntervalId: NodeJS.Timeout | null = null

      // Function to handle progress for the current step
      const handleStepProgress = () => {
        setActiveStepIndex(currentStep)
        setProgress(0) // Reset progress when starting a new step

        // Clear any existing progress interval
        if (progressIntervalId) {
          clearInterval(progressIntervalId)
        }

        // Start a new progress animation
        let stepProgress = 0
        const progressSteps = 100
        const progressInterval = timePerStep / progressSteps

        progressIntervalId = setInterval(() => {
          stepProgress += 1
          setProgress(stepProgress)

          if (stepProgress >= 100) {
            // Complete this step and move to next
            if (progressIntervalId) clearInterval(progressIntervalId)

            // Move to next step or finish
            currentStep++
            if (currentStep < scriptGenerationSteps.length) {
              setTimeout(() => handleStepProgress(), 50) // Small delay between steps
            }
          }
        }, progressInterval)
      }

      // Start with the first step
      handleStepProgress()

      // Cleanup function
      return () => {
        if (progressIntervalId) clearInterval(progressIntervalId)
      }
    }

    // Start the animation
    const cleanupFunction = updateStepStatus()

    return cleanupFunction
  }, [isVisible, scriptGenerationSteps.length])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-6 glass-card">
        <h3 className="text-xl font-semibold mb-6 text-center">
          Generating Your Script
        </h3>

        <div className="space-y-5">
          {scriptGenerationSteps.map((step, index) => {
            // Determine step status
            let status: 'waiting' | 'in-progress' | 'completed' = 'waiting'
            if (index < activeStepIndex) status = 'completed'
            else if (index === activeStepIndex) status = 'in-progress'

            return (
              <div key={step.name} className="flex items-start gap-3">
                <div className="mt-1">
                  {status === 'waiting' && (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                  {status === 'in-progress' && (
                    <Loader className="h-5 w-5 text-primary animate-spin" />
                  )}
                  {status === 'completed' && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <p className="font-medium">{step.name}</p>
                    {status === 'in-progress' && (
                      <span className="text-xs text-muted-foreground">
                        {progress}%
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>

                  {status === 'in-progress' && (
                    <Progress value={progress} className="h-1 mt-2" />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Crafting your screenplay using classic three-act structure
        </p>
        <p className="text-center text-xs text-muted-foreground mt-1">
          This process may take up to 7 minutes
        </p>
      </div>
    </div>
  )
}

export default LoadingOverlay
