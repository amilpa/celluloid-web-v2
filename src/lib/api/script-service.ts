import axios from 'axios'

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
    // const current = [
    //   {
    //     name: 'John',
    //     role_in_story: 'Main Character',
    //     core_motivation:
    //       'Desperate desire to find a cure for a devastating condition affecting him or a loved one, pushing him to extremes.',
    //     internal_conflict:
    //       'Struggles between the urgency of his quest for a cure and the ethical ramifications of his actions.',
    //     moral_weaknesses:
    //       'Desperation leads to morally ambiguous choices; he justifies unethical experiments and manipulative alliances.',
    //     physical_traits: {
    //       notable_feature_1: 'Sunken eyes reflecting sleepless nights.',
    //       notable_feature_2: 'Hunched posture indicating emotional defeat.',
    //       notable_feature_3: 'Trembling hands due to stress.',
    //     },
    //     behavioral_patterns: {
    //       habit_1: 'Restlessness, often fidgeting or pacing.',
    //       habit_2: 'Impulsive actions based on a sense of urgency.',
    //       habit_3: 'Isolation tendencies, withdrawing from loved ones.',
    //     },
    //     desires:
    //       'To regain control over his life and prevent suffering for those he loves.',
    //     self_deceptions:
    //       "Believes the ends justify the means, claiming, 'If there’s a chance, I have to take it.'",
    //     characteristic_dialogue:
    //       '"I can’t afford to lose. Not again. If there’s a chance, I have to take it."',
    //     learning_requirement:
    //       'To understand that a cure cannot justify ethical breaches and to seek collaborative, respectful solutions.',
    //     path_to_growth:
    //       'John will halt unethical experimentation and embrace accountability, allowing for reconnection with loved ones.',
    //   },
    // ]
    // const current_s = [
    //   {
    //     name: 'Amil',
    //     role_in_story: 'Antagonist',
    //     core_motivation:
    //       'Seeks revenge against John for perceived wrongs, driven by a desire for power and validation.',
    //     internal_conflict:
    //       'Wrestles with the morality of his vengeance versus the personal pain motivating his actions.',
    //     moral_weaknesses:
    //       'Jealousy and rage distort his judgment, leading to manipulation and hostility.',
    //     physical_traits: {
    //       notable_feature_1:
    //         'Disheveled appearance reflecting neglect of self-care.',
    //       notable_feature_2: 'Twitching signs of his emotional turmoil.',
    //       notable_feature_3:
    //         'Dark circles under his eyes from sleepless nights dedicated to revenge.',
    //     },
    //     behavioral_patterns: {
    //       habit_1: 'Confrontational demeanor that shows anger readily.',
    //       habit_2: 'Scheming tendencies that reflect his obsessive planning.',
    //       habit_3:
    //         'Erratic mood swings that result from his conflicted emotions.',
    //     },
    //     desires:
    //       'To exact vengeance against John to reclaim a lost sense of dignity.',
    //     self_deceptions:
    //       'Believes his revenge is a form of justice, insisting, "It\'s not just personal; it’s about restoring balance."',
    //     characteristic_dialogue:
    //       '"You took everything from me. I’ll see to it that you feel just an ounce of my suffering."',
    //     learning_requirement:
    //       'To face the reality that revenge only perpetuates suffering and prevents healing.',
    //     path_to_growth:
    //       'Amil must learn to seek reconciliation instead of retribution to reclaim his peace.',
    //   },
    //   {
    //     name: 'Joel',
    //     role_in_story: 'Supporting Character',
    //     core_motivation:
    //       'Acts as John’s protector, driven by loyalty and fear of loss.',
    //     internal_conflict:
    //       "Struggles with the extent of his loyalty versus the harmful consequences of John's choices.",
    //     moral_weaknesses:
    //       'Blind loyalty can lead to enabling destructive behavior from John.',
    //     physical_traits: {
    //       notable_feature_1: 'Weariness marked by drooped eyelids.',
    //       notable_feature_2:
    //         'Stiff limb movements reflecting his heightened alertness.',
    //       notable_feature_3: 'Furrowed brow displaying deep concern.',
    //     },
    //     behavioral_patterns: {
    //       habit_1: 'Over-protectiveness in confrontational situations.',
    //       habit_2:
    //         'Constant reassurance seeking from John about his own worth.',
    //       habit_3: 'Avoidance of conflict to maintain harmony.',
    //     },
    //     desires: "To ensure John's safety while preserving their friendship.",
    //     self_deceptions:
    //       'Believes he can always save John, expressing that "If I stand by him, I can save him from himself."',
    //     characteristic_dialogue:
    //       '"I won’t let you slip away again, not for anything. We’ll figure this out together."',
    //     learning_requirement:
    //       'To recognize that true loyalty sometimes involves challenging harmful behavior.',
    //     path_to_growth:
    //       'Joel will learn to assert boundaries while still supporting John, fostering a healthier friendship.',
    //   },
    // ]

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
    return {
      status: 'success',
      title: `The world`,
      synopsis: `A man`,
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
