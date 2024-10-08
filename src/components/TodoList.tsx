import { useContext, useState } from "react";
import { TodoContext } from "../libs/TodoProvider";
import { format } from "date-fns";
import AddTodo from "./AddTodo";
import "../styles/TodoList.css";

export default function TodoList(){
    const [onAdd, setOnAdd] = useState(false);
    const onClickAdd = (e: boolean) => {
        setOnAdd(e)
    }
    const context = useContext(TodoContext);
    if (context === null) {
        throw new Error("TodoList must be used within a TodoProvider");
    }
    const { setTodos , todos, selectedDate, setSelectedDate } = context;
    const addTodo = (todo: string) => {
        if (selectedDate) {
            const dateKey = format(selectedDate, "yyyyMMdd");
            setTodos(prevTodos => ({
                ...prevTodos,
                [dateKey]: [...(prevTodos[dateKey] || []), todo]
            }));
        }
    };
    const deleteTodo = (todoToDelete: string) => {
        if (selectedDate) {
            const dateKey = format(selectedDate, "yyyyMMdd");
            setTodos(prevTodos => ({
                ...prevTodos,
                [dateKey]: prevTodos[dateKey].filter(todo => todo !== todoToDelete)
            }));
        }
    };
    const selectedDateTodos = selectedDate 
        ? todos[format(selectedDate, "yyyyMMdd")] || []
        : [];
    
    const isToday = selectedDate && format(selectedDate, "yyyyMMdd") === format(new Date(), "yyyyMMdd");

    return(
        <section className="TodoList">
            <main>
                <div className="TodoDate">
                    <p>{selectedDate && format(selectedDate, "yyyy.MM.dd")}</p>
                    {isToday && (
                        <div>
                            <button className="AddBtn" onClick={() => onClickAdd(!onAdd)}>
                            <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="svg-icon" 
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        verticalAlign: 'middle',
                                        fill: 'white',
                                        overflow: 'hidden',
                                    }}
                                    viewBox="0 0 1024 1024" 
                                    version="1.1"
                                    >
                                        <path d="M512.761856 230.106112l-360.31488 0L152.446976 871.2448l589.847552 0L742.294528 544.626688l51.291136-48.973824L793.585664 871.2448c0 28.324864-22.966272 51.291136-51.291136 51.291136l-589.847552 0c-28.324864 0-51.291136-22.966272-51.291136-51.291136l0-641.138688c0-28.325888 22.966272-51.291136 51.291136-51.291136L563.289088 178.814976l1.276928 1.277952L512.761856 230.106112zM806.509568 152.706048c15.490048 0.776192 30.027776 7.675904 40.445952 19.171328 13.686784 10.894336 22.514688 26.747904 24.594432 44.115968-1.62816 18.169856-10.317824 34.987008-24.205312 46.83264-14.263296 14.738432-126.02368 125.159424-332.102656 328.269824l-15.777792 15.552512c-23.629824 7.300096-80.217088 25.483264-122.993664 39.281664 13.774848-45.48096 30.304256-100.427776 37.666816-126.399488 44.053504-44.003328 335.307776-334.820352 346.377216-345.726976 12.335104-12.284928 28.663808-19.74784 46.031872-21.050368M806.546432 101.465088c-30.954496 1.214464-60.319744 14.062592-82.221056 35.989504C712.329216 149.300224 372.349952 488.790016 372.349952 488.790016c-2.679808 2.705408-4.608 6.048768-5.597184 9.730048-9.203712 34.035712-55.360512 185.116672-55.824384 186.61888-2.354176 7.713792-0.25088 16.104448 5.459968 21.801984 4.007936 4.032512 9.46688 6.286336 15.152128 6.273024 2.229248 0.013312 4.458496-0.324608 6.587392-0.989184 1.577984-0.526336 157.492224-50.939904 183.149568-58.60352 3.381248-1.01376 6.462464-2.842624 8.979456-5.310464 16.191488-15.978496 328.671232-323.611648 353.902592-349.745152 26.145792-26.923008 39.156736-55.022592 38.656-83.34848-1.990656-31.118336-16.57856-60.094464-40.3968-80.2304-19.871744-20.774912-47.19616-32.80896-75.933696-33.434624l0 0L806.546432 101.465088z" />
                                    </svg>
                            </button>
                        </div>
                    )}
                </div>
                {isToday && onAdd && <AddTodo/>}
                <ul>
                    {selectedDateTodos.length === 0 ? (
                        <p>{isToday ? "오늘은 어떤 운동을 하셨나요?" : "이 날의 운동 기록이 없습니다."}</p>
                    ) : (
                        selectedDateTodos.map((todo, id) => (
                            <li key={id}>
                                <p>{todo}</p>
                                <button onClick={()=> deleteTodo(todo)}><p>x</p></button>
                            </li>
                        ))
                    )}
                </ul>  
            </main>
        </section>
    )
}
