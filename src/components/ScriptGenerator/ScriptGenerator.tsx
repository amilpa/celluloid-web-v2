import React, { useState, useEffect } from "react";
import axios from "axios";
import GeneratorCard from "./GeneratorCard";

export default function ScriptGenerator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [logline, setLogline] = useState("");
  const [abstract, setAbstract] = useState("");
  const [centralMessage, setCentralMessage] = useState("");
  const [genre, setGenre] = useState("");
  const [characters, setCharacters] = useState("");
  const [projectId, setProjectId] = useState<string | null>(null);
  const [animationClass, setAnimationClass] = useState("");
  const [pendingStep, setPendingStep] = useState<number | null>(null);
  const [isFetchingComplete, setIsFetchingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchLogline = async () => {
    try {
      const response = await axios.post(`${apiUrl}/logline-agent`, {
        abstract,
        genre,
      });
      setLogline(response.data.logline); // Adjust based on actual API response
      localStorage.setItem(projectId, JSON.stringify({ story_elements: response.data.story_elements }));
    } catch (error) {
      console.error("Error fetching logline:", error);
    }
  };

  const fetchCentralMessage = async () => {
    try {
      const response = await axios.post(`${apiUrl}/central-message`, {
        logline,
        story_elements: JSON.parse(localStorage.getItem(projectId) || "{}").story_elements, 
      });
      setCentralMessage(response.data.centralMessage); // Adjust based on actual API response
    } catch (error) {
      console.error("Error fetching central message:", error);
    }
  };

  useEffect(() => {
    if (projectId && pendingStep === 1) {
      console.log("projectId after setting:", projectId); // Confirm projectId is set
      fetchLogline().then(() => {
        const projectData = {
          logline,
          abstract,
          centralMessage,
          genre,
          characters,
        };
        localStorage.setItem(projectId, JSON.stringify(projectData));
        setCurrentStep((prevStep) => prevStep + 1);
        setPendingStep(null);
        setIsFetchingComplete(true); // Set fetching complete
        setIsLoading(false);  
      }).catch(() => {
        console.error("Error fetching logline");
        setIsFetchingComplete(true); // Ensure it's set even on error
        setIsLoading(false); // Stop loading spinner
      });
    }
  }, [projectId, pendingStep]);

  useEffect(() => {
    if (isFetchingComplete) {
        setAnimationClass("slide-in");
    }
  }, [isFetchingComplete]);

  const handleNextStep = async () => {
    setAnimationClass("slide-out");
    setTimeout(async () => {
      setIsLoading(true); // Start loading spinner
      if (currentStep === 1) {
        const newProjectId = `project_${Math.random().toString(36).substr(2, 9)}`;
        console.log("newProjectId", newProjectId);
        setProjectId(newProjectId);
        setPendingStep(1);
        setIsFetchingComplete(false); // Reset fetching complete
      } else if (currentStep === 2) {
        try {
          await fetchCentralMessage();
          setCurrentStep((prevStep) => prevStep + 1);
          setIsFetchingComplete(true); // Set fetching complete after fetching
          setIsLoading(false); // Stop loading spinner

        } catch {
          console.error("Error fetching central message");
          setIsLoading(false); // Stop loading spinner
        }
      }
    }, 500);
  };

  return (
    <div>
        <GeneratorCard
          className={animationClass}
          currentStep={currentStep}
          loading={isLoading}
          onNext={handleNextStep}
          logline={logline}
          abstract={abstract}
          centralMessage={centralMessage}
          genre={genre}
          characters={characters}
          setLogline={setLogline}
          setAbstract={setAbstract}
          setCentralMessage={setCentralMessage}
          setGenre={setGenre}
          setCharacters={setCharacters}
        />
    </div>
  );
}
