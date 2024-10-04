import React, { createContext, ReactNode, useState } from "react";

interface Todos {
    [date: string]: string[];
}

interface TodoContextType {
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
    selectedDate: Date;
    setTodos: React.Dispatch<React.SetStateAction<Todos>>;
    todos: Todos;
}

const TodoContext = createContext<TodoContextType | null>(null);

function TodoProvider({ children }: { children: ReactNode }) {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [todos, setTodos] = useState<Todos>({});

    const contextValue: TodoContextType = {
        setTodos,
        todos,
        selectedDate,
        setSelectedDate
    };

    return (
        <TodoContext.Provider value={contextValue}>
            {children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider };
