import React from "react";
import "./index.css";
import { Todo } from "../../models/model";
import SingleTask from "../SingleTask";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  toDos: Todo[];
  setToDos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completeTasks: Todo[];
  setCompleteTasks: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList: React.FC<Props> = ({ toDos, setToDos, completeTasks, setCompleteTasks }: Props) => {
  // console.log("todolist", toDos);

  return (
    <div className="container">
      <Droppable droppableId="TodoList">
        {(provided) => (
          <div
            className="tasks"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="taskHeading">Active Tasks</span>
            {toDos.map((task, i) => (
              <SingleTask
                key={task.id}
                task={task}
                taskList={toDos}
                setTaskList={setToDos}
                i={i}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TaskComplete">
        {(provided) => (
          <div
            className=" tasks complete"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="taskHeading">Completed Tasks</span>
            {completeTasks.map((task, i) => (
              <SingleTask
                key={task.id}
                task={task}
                taskList={completeTasks}
                setTaskList={setCompleteTasks}
                i={i}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;

//complete=remove in clip
