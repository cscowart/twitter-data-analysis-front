import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Card, CardGroup, ListGroup} from 'react-bootstrap'

class Botscore extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <CardGroup>
          <Card>
            <Card.Header>Complete Automation Probability</Card.Header>
    <Card.Body><h1>{this.props.data.cap.english.toFixed(2)}</h1></Card.Body>
          </Card>
          <Card>
            <Card.Header>Category Scores</Card.Header>
            <ListGroup>
    <ListGroup.Item>Content: {this.props.data.categories.content.toFixed(2)}/5</ListGroup.Item>
              <ListGroup.Item>Friends: {this.props.data.categories.friend.toFixed(2)}/5</ListGroup.Item>
              <ListGroup.Item>Network: {this.props.data.categories.network.toFixed(2)}/5</ListGroup.Item>
            </ListGroup>
          </Card>
          <Card>
            <Card.Header>Category Scores (cont.)</Card.Header>
            <ListGroup>
              <ListGroup.Item>Sentiment: {this.props.data.categories.sentiment.toFixed(2)}/5</ListGroup.Item>
              <ListGroup.Item>Temporal: {this.props.data.categories.temporal.toFixed(2)}/5</ListGroup.Item>
              <ListGroup.Item>User: {this.props.data.categories.user.toFixed(2)}/5</ListGroup.Item>
            </ListGroup>

          </Card>
        </CardGroup>
        
      </div>
    )
  }
}

export default Botscore