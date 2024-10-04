import { ChangeEvent, useContext, useState, KeyboardEvent } from "react";
import { TodoContext } from "../libs/TodoProvider";
import { format } from "date-fns";
import "../styles/addTodo.css";

export default function AddTodo (){
    const [todo, setTodo] = useState(""); 
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value);
    }
    const context = useContext(TodoContext);
    if (context === null) {
        throw new Error("YourComponent must be used within a TodoProvider");
    }
    const { setTodos , todos, selectedDate, setSelectedDate } = context;
    const addTodo = () => {
        if(todo.length === 0){
            return
        }
        if (selectedDate) {
            const dateKey = format(selectedDate, "yyyyMMdd");
            setTodos(prevTodos => ({
                ...prevTodos,
                [dateKey]: [...(prevTodos[dateKey] || []), todo]
            }));
            setTodo("")
        }
    };
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTodo();
            setTodo("");
        }
    };
    

    return (
        <div className="addTodo">
            <input type="text" value={todo} onChange={(e) => handleInputChange(e)} onKeyDown={handleKeyDown}/><button type="submit" onClick={addTodo}>+</button>
        </div>
    )
};
