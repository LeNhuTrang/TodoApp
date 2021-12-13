import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../../models/model";
import "./index.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  i: number;
  task: Todo;
  taskList: Todo[];
  setTaskList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTask: React.FC<Props> = ({
  task,
  taskList,
  setTaskList,
  i,
}: Props) => {
  //   edit task:
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task.toDo);

  const handleEditTask = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, toDo: editTask } : task
      )
    );
    setEdit(false);
  };

  //set cursor in input when edit button clicked:
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  //delete task:
  const handleDelete = (id: number) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  //set task done:
  const handleDone = (id: number) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  return (
    <Draggable draggableId={task.id.toString()} index={i}>
      {(provided) => (
        <form
          className="singleTask"
          onSubmit={(e) => handleEditTask(e, task.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTask}
              onChange={(e) => {
                setEditTask(e.target.value);
              }}
              className="singleTaskText"
            />
          ) : task.isDone ? (
            <s className="singleTaskText ">{task.toDo}</s>
          ) : (
            <span className="singleTaskText ">{task.toDo}</span>
          )}

          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !task.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(task.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(task.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTask;
