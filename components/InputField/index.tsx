import React, { useRef } from "react";
import "./index.css";

//4.
interface Props {
  toDo: string;
  setToDo: React.Dispatch<React.SetStateAction<string>>;
  handleAddTask: (e: React.FormEvent)=>void
}

const InputField: React.FC<Props> = (props: Props) => {
  const { toDo, setToDo, handleAddTask } = props;
  //8
  const inputRef = useRef<HTMLInputElement>(null)
 
  return (
    <form className="input" onSubmit={(e)=>{
      handleAddTask(e)
      inputRef.current?.blur() //9.return initial background-color when cursor out of input

    }}>
      <input
      ref={inputRef}
        className="inputBox"
        type="input"
        name=""
        placeholder="Enter a task"
        value={toDo}
        onChange={(e)=>setToDo(e.target.value)}
      />
      <button type="submit" className="inputSubmit">
        Go
      </button>
    </form>
  );
};

export default InputField;
