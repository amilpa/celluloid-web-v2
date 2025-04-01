import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Wand2,
  Users,
  Pen,
  FileCheck,
  Zap,
  RotateCw,
} from 'lucide-react'

const processSteps = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'CrewAI Assembly',
    description:
      'Our system assembles a specialized team of AI agents, each with specific expertise in screenwriting, dialogue, character development, and genre conventions.',
  },
  {
    icon: <Wand2 className="h-8 w-8 text-primary" />,
    title: 'Story Framework',
    description:
      'The Director Agent analyzes your inputs and creates a comprehensive story outline that follows proven narrative structures.',
  },
  {
    icon: <Pen className="h-8 w-8 text-primary" />,
    title: 'Collaborative Writing',
    description:
      'Multiple agents work simultaneously on different aspects of your screenplay, from character dialogue to scene descriptions, all coordinated by the Director Agent.',
  },
  {
    icon: <RotateCw className="h-8 w-8 text-primary" />,
    title: 'Iterative Refinement',
    description:
      'The Editor Agent reviews the generated content, ensuring consistency, pacing, and adherence to professional screenplay formatting standards.',
  },
  {
    icon: <FileCheck className="h-8 w-8 text-primary" />,
    title: 'Final Production',
    description:
      'The completed screenplay is formatted according to industry standards and delivered to you, ready for production or submission.',
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Rapid Delivery',
    description:
      'The entire process takes just minutes instead of weeks or months, without sacrificing quality or creativity.',
  },
]

const HowItWorks = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="py-20 pt-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="font-display text-4xl font-medium mb-4 mt-12">
                How CinematicScribe Works
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our revolutionary CrewAI technology powers an ensemble of
                specialized AI agents that collaborate to transform your ideas
                into professional screenplays.
              </p>
            </div>

            <div className="grid gap-12 md:gap-16 mb-16">
              {/* The CrewAI Process */}
              <section>
                <h2 className="text-3xl font-medium mb-8 text-center">
                  The CrewAI Process
                </h2>
                <div className="glass-card p-8">
                  <div className="grid gap-10 relative">
                    {processSteps.map((step, index) => (
                      <div
                        key={index}
                        className={`flex gap-6 relative ${
                          index < processSteps.length - 1 && 'mb-8'
                        }`}
                      >
                        {/* Step number with connecting line */}
                        <div className="flex flex-col items-center">
                          <div
                            className="rounded-full flex items-center justify-center text-primary font-medium text-xl"
                            style={{
                              background: '#f4eaff',
                              width: '50px',
                              height: '50px',
                            }}
                          >
                            {index + 1}
                          </div>
                          {index < processSteps.length - 1 && (
                            <div
                              className="w-1 grow my-2 bg-[#f4eaff]"
                              style={{ background: '#f4eaff' }}
                            ></div>
                          )}
                        </div>

                        {/* Step content */}
                        <div className="flex-1 pt-2">
                          <div className="mb-2">{step.icon}</div>
                          <h3 className="text-xl font-medium mb-2">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Our AI Agents */}
              <section>
                <h2 className="text-3xl font-medium mb-8 text-center mt-16">
                  Meet Our AI Agents
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card p-6 md:p-8">
                    <h3 className="text-xl font-medium mb-3">Plot Agent</h3>
                    <p className="text-muted-foreground mb-4">
                      Oversees the entire screenplay generation process,
                      ensuring coherent story structure and maintaining the
                      creative vision.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Story structure expertise</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Plot development</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Narrative pacing</span>
                      </li>
                    </ul>
                  </div>

                  <div className="glass-card p-6 md:p-8">
                    <h3 className="text-xl font-medium mb-3">Scene Agent</h3>
                    <p className="text-muted-foreground mb-4">
                      Crafts immersive and visually compelling scenes with
                      precise descriptions, setting details, and narrative flow
                      for maximum dramatic impact.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Visual storytelling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Setting development</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Cinematic description</span>
                      </li>
                    </ul>
                  </div>

                  <div className="glass-card p-6 md:p-8">
                    <h3 className="text-xl font-medium mb-3">Dialogue Agent</h3>
                    <p className="text-muted-foreground mb-4">
                      Crafts natural, engaging dialogue that reflects each
                      character's personality while advancing the plot.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Authentic speech patterns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Subtext and implication</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Genre-appropriate tone</span>
                      </li>
                    </ul>
                  </div>

                  <div className="glass-card p-6 md:p-8">
                    <h3 className="text-xl font-medium mb-3">
                      Script Formatting Agent
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Reviews and refines the screenplay for consistency,
                      pacing, and adherence to industry formatting standards.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Industry formatting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Consistency checking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Quality assurance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            <div className="text-center mt-16">
              <p className="text-lg mb-6">
                Ready to experience the power of collaborative AI screenwriting?
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/create')}
                className="group"
              >
                Create Your Script Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default HowItWorks
