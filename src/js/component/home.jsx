import React, { useEffect, useState } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the initial to-do list from the API
    fetch("https://assets.breatheco.de/apis/fake/todos/user/salo")
      .then(resp => resp.json())
      .then(data => setTodos(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    // Update the API with the modified to-do list whenever todos change
    fetch("https://assets.breatheco.de/apis/fake/todos/user/salo", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        console.log(resp.ok); // true if the response is successful
        console.log(resp.status); // the status code (e.g., 200, 400, etc.)
        console.log(resp.text()); // the response as text
        return resp.json(); // parse the response as JSON and return a promise
      })
      .then(data => {
        console.log(data); // the object received from the server
      })
      .catch(error => {
        console.log(error); // error handling
      });
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() === "") return;

    // Create a new to-do object and update the todos state
    const newTodo = { label: inputValue, done: false };
    setTodos([...todos, newTodo]);

    // Clear the input field
    setInputValue("");
  };

  const deleteTodo = index => {
    // Remove the selected to-do from the todos state
    const updatedTodos = todos.filter((_, currentIndex) => index !== currentIndex);
    setTodos(updatedTodos);
  };

  const cleanAllTasks = () => {
    // Delete the entire list from the server and update the todos state
    fetch("https://assets.breatheco.de/apis/fake/todos/user/salo", {
      method: "DELETE"
    })
      .then(resp => resp.json())
      .then(data => setTodos([]))
      .catch(error => console.log(error));
  };

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
                      addTodo();
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
                  <span style={{ flexGrow: 1 }}>{item.label}</span>
                  <i
                    className="fas fa-times"
                    onClick={() => deleteTodo(index)}
                  ></i>
                </li>
              ))}
              <div className="todosLeft">{todos.length} tasks left</div>
              {todos.length > 0 && (
                <button className="btn btn-danger" onClick={cleanAllTasks}>
                  Clean All Tasks
                </button>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
