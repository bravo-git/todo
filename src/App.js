import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import {TodoBanner } from "./TodoBanner";
import {TodoCreator } from "./TodoCreator";
import {TodoRow } from "./TodoRow";
import {VisibilityControl} from "./VisibilityControl";

export default class App extends Component {

constructor(props) {
  super(props);
  this.state = {
    userName: "Adam",
    todoItems: [{action: "Buy Flowers", done: false},
                {action: "Get Shoes", done: false},
                {action: "Collect Tickets", done: true},
                {action: "Call Joe", done:false}],
    //newItemText: ""
  }
}

updateNewTextValue = (event) => {
  this.setState({newItemText: event.target.value});
}

createNewTodo = (task) => {
  if(!this.state.todoItems.find(item=> item.action === task)) {
    this.setState({
      todoItems: [...this.state.todoItems, 
      { action: this.state.newItemText, done: false }],
      }, () => localStorage.setItem("todos", JSON.stringify(this.state)));

      }
    }

componentDidMount = () => {
        let data = localStorage.getItem("todos");
        this.setState(data != null
            ? JSON.parse(data)
            :  {
                userName: "Adam",
                todoItems: [{ action: "Buy Flowers", done: false },
                            { action: "Get Shoes", done: false },
                            { action: "Collect Tickets", done: true },
                            { action: "Call Joe", done: false }],
                showCompleted: true
            });
    }

createNewTodo = (task) => {
        if (!this.state.todoItems.find(item => item.action === task)) {
            this.setState({
                todoItems: [...this.state.todoItems, { action: task, done: false }]
            });
        }
    }

toggleTodo = (todo) => this.setState
  ({ todoItems: this.state.todoItems.map
    (item=> item.action === todo.action ?{...item, done: !item.done}: item) });

  todoTableRows = () => this.state.todoItems.map(item =>
    <TodoRow key ={item.action} item={ item} callback={ this.toggleTodo}
    />
   )


  render = () =>
        <div>
        <TodoBanner name={this.state.userName} tasks={this.state.todoItems} />
        <div className="container-fluid">
        <TodoCreator callback={ this.createNewTodo} />
            <table className ="table table-striped table-bordered">
            <thead>
            <tr><th>Description</th><th>Done</th></tr>
            </thead>
            <tbody>{this.todoTableRows(false)}</tbody>
            </table>
            <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl Description="Completed Tasks"
            isChecked={this.state.showCompleted}
            callback={ (checked) =>
                this.setState({ showCompleted: checked})} />
        </div>

        {this.state.showCompleted && 
          <table className="table table-striped table-bordered">
              <thead>
                <tr><th>Description</th><th>Done</th></tr>
                </thead>
                <tbody>{ this.todoTableRows(true)}</tbody>
                </table>
              }
        </div>
        </div>
} 



