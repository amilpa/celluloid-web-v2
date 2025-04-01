import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusCircle, FileText, Clock, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '@/components/Header'

import { scriptProjects } from '@/lib/projectData'

import { db } from '@/lib/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

const Dashboard = () => {
  const [scripts, setScripts] = React.useState([])
  useEffect(() => {
    // fetch all scripts
    const fetchScripts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'scripts'))
        const scripts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setScripts(scripts)
      } catch (error) {
        console.error('Error fetching scripts:', error)
      }
    }
    fetchScripts()
  }, [])

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <Header />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-display font-medium mb-2">
              Your Script Projects
            </h1>
            <p className="text-muted-foreground">
              Manage and continue working on your screenplay projects
            </p>
          </div>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Script
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scriptProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader className="bg-primary/5 pb-4">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="bg-primary/30 text-white w-fit px-2 py-0.5 rounded text-xs">
                  {project.genre}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
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
                <Link to={`/display?id=${project.id}`}>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <FileText className="h-4 w-4" />
                    View
                  </Button>
                </Link>
                <Link to={`/display?id=${project.id}`}>
                  <Button variant="outline" size="sm">
                    Continue Writing
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}

          {scripts.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader className="bg-primary/5 pb-4">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="bg-primary/30 text-white w-fit px-2 py-0.5 rounded text-xs">
                  {project.genre}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  {project.abstract}
                </p>
                <div className="flex flex-col space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Last edited just now</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Created just now</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t flex justify-between pt-4">
                <Link to={`/display?id=${project.id}&fetch=firebase`}>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <FileText className="h-4 w-4" />
                    View
                  </Button>
                </Link>
                <Link to={`/display?id=${project.id}&fetch=firebase`}>
                  <Button variant="outline" size="sm">
                    Continue Writing
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}

          {/* Add New Project Card */}
          <Link to="/create">
            <Card className="flex flex-col items-center justify-center h-full border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer min-h-[320px]">
              <CardContent className="flex flex-col items-center justify-center h-full py-8">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <PlusCircle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-2">Create New Script</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Start a fresh screenplay project with AI assistance
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
