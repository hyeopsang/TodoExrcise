import './App.css';
import WorkoutList from './components/WorkoutList';
import Calendar from './components/Calendar';
import { WorkoutProvider } from './libs/WorkoutProvider';
import { TodoProvider } from './libs/TodoProvider';
import TodoList from './components/TodoList';

function App() {
  return (
    <WorkoutProvider>
    <TodoProvider>
      <div className='App'>
        <WorkoutList/>
         <Calendar/>   
         <TodoList/>
      </div>        
      </TodoProvider>
    </WorkoutProvider> 
  );
}

export default App;
