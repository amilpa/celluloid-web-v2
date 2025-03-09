
interface ScriptParams {
  genre: string;
  premise: string;
  characters: string;
  setting: string;
  tone: string;
}

interface ScriptResponse {
  title: string;
  script: string;
  synopsis: string;
  status: 'success' | 'error';
  message?: string;
}

// This is a mock implementation - in a real app, this would call a backend API
export const generateScript = async (params: ScriptParams): Promise<ScriptResponse> => {
  try {
    console.log('Generating script with params:', params);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // For demo purposes, return a mock response
    // In a real implementation, this would call a backend API with the CrewAI framework
    return {
      status: 'success',
      title: `The ${params.tone} ${params.genre}`,
      synopsis: `A ${params.tone} tale set in ${params.setting} about ${params.premise}`,
      script: mockScript(params)
    };
  } catch (error) {
    console.error('Error generating script:', error);
    return {
      status: 'error',
      title: '',
      script: '',
      synopsis: '',
      message: 'Failed to generate script. Please try again.'
    };
  }
};

// Simple mock script generator for demonstration
const mockScript = (params: ScriptParams): string => {
  const characters = params.characters.split(',').map(c => c.trim());
  
  let script = `TITLE: THE ${params.tone.toUpperCase()} ${params.genre.toUpperCase()}\n\n`;
  script += `FADE IN:\n\n`;
  script += `EXT. ${params.setting.toUpperCase()} - DAY\n\n`;
  
  script += `A ${params.tone} atmosphere engulfs the scene as we see ${characters[0]} standing alone.\n\n`;
  
  script += `${characters[0].toUpperCase()}\n(thoughtfully)\nI never thought it would come to this.\n\n`;
  
  if (characters.length > 1) {
    script += `${characters[1].toUpperCase()} enters the frame, approaching slowly.\n\n`;
    
    script += `${characters[1].toUpperCase()}\nYou knew this day would come. We all did.\n\n`;
    
    script += `${characters[0].toUpperCase()}\nBut not like this. Not with ${params.premise}.\n\n`;
  }
  
  script += `The wind picks up as the camera PANS to reveal the full extent of ${params.setting}.\n\n`;
  
  script += `FADE TO BLACK.\n\n`;
  script += `THE END`;
  
  return script;
};
