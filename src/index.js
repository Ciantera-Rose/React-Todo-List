import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import TodoItem from "./todo-item";

import "./styles.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      todo: "",
      todos: [{ title: "mock data" }],
    };
  }
  componentDidMount() {
    axios
      .get("https://cjr-todo-flask-api.herokuapp.com/todos")
      .then((res) => {
        this.setState({
          todos: res.data,
        });
      })
      .catch((err) => console.error(err));
  }

  handleChange = (e) => {
    this.setState({
      todo: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //console.log("submitted");
    //Post to API
    axios
      .post("https://cjr-todo-flask-api.herokuapp.com/todo", {
        title: this.state.todo,
        done: false,
      })
      //setState with new item
      .then((res) => {
        this.setState({
          todos: [...this.state.todos, res.data],
          todo: "",
        });
      })
      .catch((err) => console.error("handleSubmit Error: ", err));
  };

  deleteTodo = id => {
    axios
    .delete(`https://cjr-todo-flask-api.herokuapp.com/delete/todo/${id}`)
    .then(() => {
      this.setState({
        todos: this.state.todos.filter(todo => {
          return todo.id !== id
        })
      })
    })
    .catch((err) => console.error("delete Todo Error: ", err))
  }

  renderTodos = () => {
    return this.state.todos.map((todo) => {
      return <TodoItem key={todo.id} {...todo} deleteTodo={this.deleteTodo} />
    })
  }

  // Calling preventDefault() during any stage of event flow cancels the event,
  // meaning that any default action normally taken by the implementation as a result of the event will not occur.

  render() {
    return (
      <div className="app">
        <h1>Todo List</h1>
        <form className="add-todo" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add Todo"
            onChange={this.handleChange}
            value={this.state.todo}
          />
          <button type="submit">Add</button>
        </form>
        {this.renderTodos()}
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// List of Todos
// Form
