
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Download, Copy, Check } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ScriptDisplayProps {
  title: string;
  synopsis: string;
  script: string;
}

const ScriptDisplay = ({ title, synopsis, script }: ScriptDisplayProps) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Script has been copied to your clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };
  
  const downloadScript = () => {
    const element = document.createElement("a");
    const file = new Blob([script], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded",
      description: "Script has been downloaded successfully",
    });
  };
  
  return (
    <div className="glass-card overflow-hidden animate-scale-in">
      <div className="p-6 md:p-8 border-b">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-medium">{title}</h3>
            <p className="text-muted-foreground mt-1">{synopsis}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={copyToClipboard}
              className="flex gap-1 items-center"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={downloadScript}
              className="flex gap-1 items-center"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="script" className="w-full">
        <div className="px-6 pt-4 border-b">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
            <TabsTrigger value="script" className="flex gap-2 items-center">
              <FileText className="h-4 w-4" />
              Script
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex gap-2 items-center">
              Format Preview
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="script" className="m-0">
          <ScrollArea className="h-[500px] p-6 md:p-8">
            <pre className="script-text">{script}</pre>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="preview" className="m-0">
          <ScrollArea className="h-[500px] p-6 md:p-8">
            <div className="max-w-2xl mx-auto font-mono">
              <div className="text-center mb-8 uppercase">
                <h4 className="text-xl font-bold mb-4">{title}</h4>
                <p className="text-sm">Written by</p>
                <p className="text-sm">CinematicScribe AI</p>
              </div>
              
              {script.split('\n\n').map((paragraph, i) => {
                // Format based on screenplay conventions
                if (paragraph.match(/^[A-Z\s]+$/)) {
                  // Scene headings
                  return <p key={i} className="font-bold my-4">{paragraph}</p>;
                } else if (paragraph.match(/^[A-Z][A-Za-z\s]+$/)) {
                  // Character names
                  return <p key={i} className="text-center my-2">{paragraph}</p>;
                } else if (paragraph.includes('(') && paragraph.includes(')')) {
                  // Parentheticals
                  return <p key={i} className="text-center italic my-1">{paragraph}</p>;
                } else {
                  // Action or dialogue
                  return <p key={i} className="my-3">{paragraph}</p>;
                }
              })}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScriptDisplay;
