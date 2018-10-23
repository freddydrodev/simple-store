import React, { Component } from "react";
import PouchDB from "pouchdb-browser";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { Input, Button, Checkbox } from "antd";
import Home from "./pages/home";
import Pending from "./pages/pending";
import Completed from "./pages/completed";

const db = new PouchDB("re-lectron");

class App extends Component {
  state = {
    database: null,
    todoText: "",
    todos: []
  };

  showTodos = () => {
    db.allDocs({ include_docs: true, descending: true })
      .then(doc => {
        const todos = doc.rows.map(({ doc }) => doc);
        this.setState({ todos });
      })
      .catch(err => console.warn);
  };

  async componentDidMount() {
    this.showTodos();
    db.changes({ since: "now", live: true }).on("change", this.showTodos);
  }

  addTodo = () => {
    const { todoText } = this.state;
    const todo = {
      _id: new Date().toISOString(),
      title: todoText,
      completed: false
    };

    if (todoText.trim().length > 0) {
      db.put(todo)
        .then(() => console.log("todo added"))
        .catch(err => console.warn)
        .then(() => this.setState({ todoText: "" }));
    }
  };

  inputHandler = ({ target }) => {
    const todoText = target.value;
    this.setState({ todoText });
  };

  deleteTodo = todo => {
    db.remove(todo);
  };

  updateTodo = (todo, val) => {
    const newTodo = { ...todo, completed: val };
    db.put(newTodo);
  };
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1>Simple todo REACT ELECTRON POUCHDB</h1>
            <Input
              value={this.state.todoText}
              onChange={this.inputHandler}
              ref={inp => (this.inp = inp)}
              onPressEnter={this.addTodo}
              style={{ marginBottom: 15 }}
            />
            <p>
              <Link to="/">Home</Link> | <Link to="/completed">Completed</Link>{" "}
              | <Link to="/pending">Pending</Link>
            </p>
            <Switch>
              <Route path="/completed" component={Completed} />
              <Route path="/pending" component={Pending} />
              <Route path="/" component={Home} />
            </Switch>
            <ul>
              {this.state.todos.map(todo => {
                const { title, _id, completed } = todo;
                return (
                  <li key={_id}>
                    <Checkbox
                      checked={completed}
                      onChange={({ target }) =>
                        this.updateTodo(todo, target.checked)
                      }
                    />{" "}
                    {title}{" "}
                    <Button
                      icon="delete"
                      type="danger"
                      size="small"
                      onClick={() => this.deleteTodo(todo)}
                    />
                  </li>
                );
              })}
            </ul>
          </header>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
