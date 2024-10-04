import React, { createContext, ReactNode, useEffect, useState } from "react";

interface WorkOut {
    name: string;
    type: string;
    muscle: string;
    equipment: string;
    difficulty: string;
    instructions: string;
}

interface WorkoutContextType {
  setTarget: React.Dispatch<React.SetStateAction<string>>;
  target: string;
  workOut: WorkOut[]; 
  isLoading: boolean;
}

const WorkoutContext = createContext<WorkoutContextType | null>(null);

interface WorkoutProviderProps {
  children: ReactNode;
}

function WorkoutProvider({ children }: WorkoutProviderProps) {
    const [workOut, setWorkOut] = useState<WorkOut[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [target, setTarget] = useState<string>("");
    const apiKey = process.env.REACT_APP_NINJA_API_KEY;

    useEffect(() => {
        if (target && apiKey) { 
            setIsLoading(true);
            const headers: HeadersInit = {
                'X-Api-Key': apiKey,
                'Content-Type': 'application/json'
            };
    
            fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${target}`, {
                method: 'GET',
                headers: headers
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setWorkOut(data);
                setIsLoading(false);
                console.log(data)
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error.message);
                setIsLoading(false);
            });
        }
    }, [target, apiKey]);

    const contextValue: WorkoutContextType = {
        setTarget,
        target,
        workOut,
        isLoading
    };

  return (
    <WorkoutContext.Provider value={contextValue}>
      {children}
    </WorkoutContext.Provider>
  );
}

export { WorkoutContext, WorkoutProvider };
