import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./models/model";

const App: React.FC = () => {
  const [toDo, setToDo] = useState<string>("");
  const [toDos, setToDos] = useState<Todo[]>([]);
  const [completeTasks, setCompleteTasks] = useState<Todo[]>([]);

  //add task:
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (toDo) {
      setToDos([...toDos, { id: Date.now(), toDo, isDone: false }]);
      setToDo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const { source, destination } = result;

    //destination out of draggable zone:
    if (!destination) return;

    //destination unchanged:
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    //otherwise:
    let chosenTask;
    let activeTasks = toDos;
    let doneTasks = completeTasks;
    //remove a chosen task from list:
    if (source.droppableId === "TodoList") {
      chosenTask = activeTasks[source.index];
      activeTasks.splice(source.index, 1);
    } else {
      chosenTask = completeTasks[source.index];
      doneTasks.splice(source.index, 1);
    }
    //add a chosen task to a new destination
    if (destination.droppableId === "TodoList") {
      activeTasks.splice(destination.index, 0, chosenTask);
    } else {
      doneTasks.splice(destination.index, 0, chosenTask);
    }
    //
    setToDos(activeTasks)
    setCompleteTasks(doneTasks)

  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="title">To-do List</span>
        <InputField
          toDo={toDo}
          setToDo={setToDo}
          handleAddTask={handleAddTask}
        />
        <TodoList
          toDos={toDos}
          setToDos={setToDos}
          completeTasks={completeTasks}
          setCompleteTasks={setCompleteTasks}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
