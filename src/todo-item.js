import React, { useState } from "react";
import axios from "axios";

//useState for this component
export default function TodoItem(props) {
  const [done, setDone] = useState(props.done);

  const toggleDone = () => {
      //update API data
      axios.patch(`https://cjr-todo-flask-api.herokuapp.com/todo/${props.id}`, {
          done: !done
      })
      //update State
      .then(() => setDone(!done))
      .catch(err => console.error("toggleDone Error:", err))
  }

  return (
    <div className="todo-item">
        <input type="checkbox"
        onClick={toggleDone}
        defaultChecked={done}
        />
      <p>{props.title}</p>
      {/* <button onClick>x</button> */}
    </div>
  );
}
