import React, { Component } from 'react'
import { Card, Button, Container, Image, Row, Col, } from 'react-bootstrap'

class Confirmation extends Component {
  render() {
    return (
      <div style={{height:'10vh'}}>
        <Container>
          <Row className="justify-content-md-center">

              <Card style={{ float: 'left' , width:'50%'}}>
              
              <Image style={{ position:'absolute', right:'4%', top:'10%', height:'50%'}} src={this.props.user.profile_image_url.replace('_normal.', '_bigger.')}  rounded />
                <Card.Body>
                  <Card.Title>
                    {this.props.user.name}
                  </Card.Title>
                  <Card.Subtitle>@{this.props.user.screen_name}</Card.Subtitle>
                  <Card.Text style={{width:'50%'}}>
                    {this.props.user.description}
                  </Card.Text>
                  <Card.Text>
                    {this.props.user.friends_count} Following
                  </Card.Text>
                  <Card.Text>
                    {this.props.user.followers_count} Followers
                  </Card.Text>
                  <Button variant="primary" block onClick={this.props.onClick}>Confirm</Button>
                </Card.Body>
                
              </Card>
              </Row>
        </Container>
      </div>
    )
  }
}

export default Confirmation