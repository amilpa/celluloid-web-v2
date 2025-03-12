import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

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
            <Button size="lg" variant="outline">
              Explore Examples
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 px-4 md:px-6 animate-blur-in">
        <div className="p-4 md:p-8 glass-card overflow-hidden">
          <div className="h-[240px] md:h-[320px] bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-white text-center space-y-4">
              <div className="animate-pulse-soft">
                <Sparkles className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="font-medium">CrewAI Agents Collaborating</p>
              </div>
              <p className="text-sm text-gray-400">
                Visual representation of AI script creation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
