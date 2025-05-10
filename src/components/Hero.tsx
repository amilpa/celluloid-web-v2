import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="hero-gradient" aria-hidden="true" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8 animate-fade-in">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium mb-4 animate-scale-in">
            <Sparkles className="h-3.5 w-3.5 mr-2 text-primary" />
            <span>Revolutionary AI Script Writing</span>
          </div>

          <h1 className="font-display font-medium leading-tight tracking-tighter">
            Transform Your Ideas Into
            <br />
            <span className="text-gradient">Professional Movie Scripts</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
            Harness the power of collaborative AI agents to effortlessly craft
            compelling screenplays that captivate audiences and bring your
            stories to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link to="/create">
              <Button size="lg" className="group">
                Create Your Script
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to={'/examples'}>
              <Button size="lg" variant="outline">
                Explore Examples
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 px-4 md:px-6 animate-blur-in">
        <div className="p-4 md:p-8 glass-card overflow-hidden">
          <div className="rounded-lg overflow-hidden aspect-video relative">
            <div
              style={{
                left: 0,
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            >
              <iframe
                src="https://cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DrU5nwnDYaOM%26ab_channel%3DAmilPA&key=925108d922be940af814f71907a7df4b"
                style={{
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  border: 0,
                }}
                allowFullScreen
                scrolling="no"
                allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *; web-share *;"
                title="CrewAI Agents Collaborating"
              ></iframe>
            </div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium">See CrewAI Agents in Action</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Watch how our AI collaborators transform ideas into professional
              scripts
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
