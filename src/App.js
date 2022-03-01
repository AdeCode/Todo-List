import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Todos from './components/Todos';
import './index.css';
import {v4 as uuidv4} from 'uuid';

import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import axios from 'axios';
import LearnApi from './components/pages/LearnApi';
import Student from './components/pages/Student';

class App extends Component{
  state = {
    todos: []
  }
  
  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({todos: res.data }))
  }

  //Toggle complete in the checkbox
  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  //Delete todo
  delTodo=(id)=>{
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({todos: [...this.state.todos.filter
      (todo => todo.id !== id)]}));
    // this.setState({ todos: [...this.state.todos.filter(
    //   todo => todo.id !== id)] });
  }

  //Add todo
  addTodo = (title) => {
    // const newTodo = {
    //   id: uuidv4(),
    //   title: title,
    //   completed: false
    // }
    
    axios.post('https://jsonplaceholder.typicode.com/todos',{
      title,
      completed: false
    })
    .then(res => this.setState({ todos: 
      [...this.state.todos, res.data] }))
  }


  render(){
    //console.log(this.state.todos)
    return(
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete}
                  delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About}/>
            <Route path="/api" exact component={LearnApi}/>
            <Route path="/student-resource" exact component={Student}/>

          </div>
        </div>
      </Router>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <Todos/>
//     </div>
//   );
// }

export default App;
