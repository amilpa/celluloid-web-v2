
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample script projects data
const scriptProjects = [
  {
    id: 1,
    title: 'The Midnight Hour',
    genre: 'Thriller',
    description: 'A tense thriller about a night that changes everything.',
    lastEdited: '2 days ago',
    createdAt: 'June 15, 2023',
  },
  {
    id: 2,
    title: 'Echoes of Tomorrow',
    genre: 'Science Fiction',
    description: 'A journey through time and space that questions reality.',
    lastEdited: '1 week ago',
    createdAt: 'May 22, 2023',
  },
  {
    id: 3,
    title: 'The Last Sunset',
    genre: 'Drama',
    description: 'An emotional story about letting go and finding peace.',
    lastEdited: '3 days ago',
    createdAt: 'July 3, 2023',
  }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-medium mb-2">Your Script Projects</h1>
            <p className="text-muted-foreground">Manage and continue working on your screenplay projects</p>
          </div>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Script
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scriptProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="bg-primary/5 pb-4">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="bg-primary/20 text-primary-foreground w-fit px-2 py-0.5 rounded text-xs">
                  {project.genre}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-col space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Last edited {project.lastEdited}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Created on {project.createdAt}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t flex justify-between pt-4">
                <Button variant="ghost" size="sm" className="gap-1">
                  <FileText className="h-4 w-4" />
                  View
                </Button>
                <Button variant="outline" size="sm">Continue Writing</Button>
              </CardFooter>
            </Card>
          ))}
          
          {/* Add New Project Card */}
          <Card className="flex flex-col items-center justify-center h-full border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer min-h-[320px]">
            <CardContent className="flex flex-col items-center justify-center h-full py-8">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <PlusCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Create New Script</h3>
              <p className="text-center text-muted-foreground">
                Start a fresh screenplay project with AI assistance
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
