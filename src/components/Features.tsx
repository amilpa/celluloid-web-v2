
import { useRef } from 'react';
import { useInView } from '@/lib/utils/animation';
import { 
  Pen, 
  Users, 
  Zap, 
  Wand2, 
  BookOpen, 
  LayoutTemplate 
} from 'lucide-react';

const features = [
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Collaborative AI Agents',
    description: 'Multiple specialized AI agents work together to craft your screenplay, each focusing on their area of expertise.'
  },
  {
    icon: <Pen className="h-6 w-6" />,
    title: 'Industry Standard Format',
    description: 'Scripts are generated in professional screenplay format, ready for production or submission.'
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Rapid Generation',
    description: 'Transform your concept into a complete script in minutes instead of weeks or months.'
  },
  {
    icon: <Wand2 className="h-6 w-6" />,
    title: 'Creative Assistance',
    description: 'Get help with plot development, character arcs, and dialogue that feels natural and engaging.'
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Genre Expertise',
    description: 'Specialized knowledge across all major film genres, from action to romance to science fiction.'
  },
  {
    icon: <LayoutTemplate className="h-6 w-6" />,
    title: 'Customizable Templates',
    description: 'Choose from various narrative structures or create your own unique storytelling approach.'
  }
];

export const Features = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-4xl font-medium mb-4">
            Powered by CrewAI Technology
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform leverages multiple specialized AI agents that collaborate 
            to create compelling, production-ready screenplays.
          </p>
        </div>
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`glass-card p-6 transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
