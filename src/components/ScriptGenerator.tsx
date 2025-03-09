
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { generateScript } from '@/lib/api/script-service';
import { InputField, TextareaField, SelectField } from '@/components/ui/form-elements';
import { toast } from '@/components/ui/use-toast';
import ScriptDisplay from '@/components/ScriptDisplay';

const genres = [
  { value: 'action', label: 'Action' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'drama', label: 'Drama' },
  { value: 'thriller', label: 'Thriller' },
  { value: 'sci-fi', label: 'Science Fiction' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'horror', label: 'Horror' },
  { value: 'romance', label: 'Romance' },
];

const tones = [
  { value: 'dramatic', label: 'Dramatic' },
  { value: 'comedic', label: 'Comedic' },
  { value: 'suspenseful', label: 'Suspenseful' },
  { value: 'inspiring', label: 'Inspiring' },
  { value: 'dark', label: 'Dark' },
  { value: 'lighthearted', label: 'Lighthearted' },
  { value: 'satirical', label: 'Satirical' },
  { value: 'poignant', label: 'Poignant' },
];

export const ScriptGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [scriptResult, setScriptResult] = useState<null | {
    title: string;
    script: string;
    synopsis: string;
  }>(null);
  
  const [formData, setFormData] = useState({
    genre: 'drama',
    premise: '',
    characters: '',
    setting: '',
    tone: 'dramatic',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.premise.trim() || !formData.characters.trim() || !formData.setting.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    setScriptResult(null);
    
    try {
      const result = await generateScript(formData);
      
      if (result.status === 'success') {
        setScriptResult({
          title: result.title,
          script: result.script,
          synopsis: result.synopsis,
        });
        toast({
          title: "Script generated",
          description: "Your script has been successfully created",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to generate script",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const resetForm = () => {
    setScriptResult(null);
    window.scrollTo({ top: document.getElementById('create')?.offsetTop || 0, behavior: 'smooth' });
  };
  
  return (
    <section id="create" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-medium mb-4">
              Create Your Script
            </h2>
            <p className="text-muted-foreground text-lg">
              Let our AI crew transform your ideas into a professional screenplay
            </p>
          </div>
          
          {scriptResult ? (
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
          ) : (
            <div className="glass-card p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectField
                    label="Genre"
                    options={genres}
                    value={formData.genre}
                    onChange={(value) => handleSelectChange('genre', value)}
                  />
                  <SelectField
                    label="Tone"
                    options={tones}
                    value={formData.tone}
                    onChange={(value) => handleSelectChange('tone', value)}
                  />
                </div>
                
                <TextareaField
                  label="Premise"
                  id="premise"
                  name="premise"
                  placeholder="Briefly describe your story concept"
                  value={formData.premise}
                  onChange={handleInputChange}
                  helperText="What is your story about? Give a brief summary of the main plot."
                  rows={3}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Characters"
                    id="characters"
                    name="characters"
                    placeholder="List main characters, separated by commas"
                    value={formData.characters}
                    onChange={handleInputChange}
                    helperText="E.g., John (detective), Sarah (scientist), Mike (villain)"
                  />
                  
                  <InputField
                    label="Setting"
                    id="setting"
                    name="setting"
                    placeholder="Where and when does the story take place?"
                    value={formData.setting}
                    onChange={handleInputChange}
                    helperText="E.g., Modern-day New York, Medieval kingdom, Space station"
                  />
                </div>
                
                <div className="flex justify-center mt-6 pt-4">
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
                    ) : "Generate Script"}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScriptGenerator;
