import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import dataAnalysisAPI from '../../api/dataAnalysisAPI'

class PublishForm extends Component {
  state = {
    redirect: false
  }

  handleSubmit(event){
    event.preventDefault()
    const d = new Date().toISOString().slice(0,10)
    const graphicObj = {
      title: event.target.elements[0].value,
      author: event.target.elements[1].value,
      date_created: d,
      graph_code_js: this.props.code
    }
    console.log(graphicObj)
    dataAnalysisAPI.addGraphic(graphicObj)
    .then((response) => { this.setState({ redirect: true }) })
  }

  render() {
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to = "/interesting_finds" />
    }
    return (
      <div>
         <Form>
           <Form.Group controlId='title'>
             <Form.Label>Title</Form.Label>
             <Form.Control/>
           </Form.Group>

           <Form.Group controlId='author'>
             <Form.Label>Author</Form.Label>
             <Form.Control/>
           </Form.Group>

           <Button variant="primary" type="submit">
            Submit
          </Button>
         </Form>
      </div>
    )
  }
}

export default PublishForm