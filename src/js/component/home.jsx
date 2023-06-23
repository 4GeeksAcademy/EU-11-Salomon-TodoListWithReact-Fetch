import React, { useEffect, useState } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const createUser = () => {
      fetch ("https://assets.breatheco.de/apis/fake/todos/user/salo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([])
      });
    }
    createUser();
}, [])



fetch ("https://assets.breatheco.de/apis/fake/todos/user/salo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([
          { label: "Make the bed", done: false },
          { label: "Walk the dog", done: false },
          { label: "Do the replits", done: false }
        ])
      });

  fetch ("https://assets.breatheco.de/apis/fake/todos/user/salo");

  return (
    <div>
      <h1>todos</h1>
      <div className="container">
        <div className="row">
          <div className="col">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <input
                  type="text"
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      setTodos(todos.concat([inputValue]));
                      setInputValue("");
                    }
                  }}
                  placeholder="No tasks, add a task"
                />
              </li>
              {todos.map((item, index) => (
                <li
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                  className="list-group-item"
                >
                  <span style={{ flexGrow: 1 }}>{item}</span>
                  <i
                    className="fas fa-times"
                    onClick={() =>
                      setTodos(
                        todos.filter((_, currentIndex) => index !== currentIndex)
                      )
                    }
                  ></i>
                </li>
              ))}
              <div className="todosLeft">
                {todos.length} tasks left
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Home; 