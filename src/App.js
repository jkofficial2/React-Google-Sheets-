import React, { Component } from 'react'
import { Button, Form, Container, Header } from 'semantic-ui-react'
import axios from 'axios'
export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      age: '',
      salary: '',
      hobby: ''
    }
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);

    const { name, age, salary, hobby } = this.state;
    localStorage.setItem('name', name);
    localStorage.setItem('age', age);
    localStorage.setItem('salary', salary);
    localStorage.setItem('hobby', hobby);


    axios.post('https://sheet.best/api/sheets/633246f0-1039-40f0-9b0c-9f330f5232ab', this.state)
      .then(response => {
        console.log(response);
      })
  }
  componentDidMount() {
    const { name, age, salary, hobby } = this.setState;
    localStorage.getItem('name', name);
    localStorage.getItem('age', age);
    localStorage.getItem('salary', salary);
    localStorage.getItem('hobby', hobby);

    this.setState([name, age, salary, hobby])
  }

  render() {
    const { name, age, salary, hobby } = this.state;
    return (
      <Container fluid className="container">
        <Header as='h2'>React Google Sheets!</Header>
        <Form className="form" onSubmit={this.submitHandler}>
          <Form.Field>
            <label>Name</label>
            <input placeholder='Enter your name' type="text" name="name" value={name} onChange={this.changeHandler} />
          </Form.Field>
          <Form.Field>
            <label>Age</label>
            <input placeholder='Enter your age' type="number" name="age" value={age} onChange={this.changeHandler} />
          </Form.Field>
          <Form.Field>
            <label>Salary</label>
            <input placeholder='Enter your salary' type="number" name="salary" value={salary} onChange={this.changeHandler} />
          </Form.Field>
          <Form.Field>
            <label>Hobby</label>
            <input placeholder='Enter your hobby' type="text" name="hobby" value={hobby} onChange={this.changeHandler} />
          </Form.Field>

          <Button color="blue" type='submit'>Submit</Button>
        </Form>
      </Container>
    )
  }
}