import React, { Component } from 'react'
import { InputGroup, FormControl, Button, Jumbotron, Nav} from 'react-bootstrap'
import dataAnalysisAPI from '../api/dataAnalysisAPI'
import { Redirect } from 'react-router-dom'
import Confirmation from '../components/Confirmation/Confirmation.js'

class HomePage extends Component {
  state = {
    confirmation_visible: false,
    user: {},
    handle: '',
    redirect: false,
    user_data: {}
  }

  handleSearchClick = (event) => {
    event.preventDefault()
    let handle_search = document.getElementById('screenNameSearch').value
    dataAnalysisAPI.fetchUser(handle_search)
    .then((apiResponseJSON) => {
      this.setState({
          user: apiResponseJSON,
          confirmation_visible:true, 
          handle:handle_search
        })
      })
  }

  handleConfirmClick = (event) => {
    event.preventDefault()
    dataAnalysisAPI.fetchUserData(this.state.handle)
      .then((apiResponseJSON) => {
        this.setState({
          user_data:apiResponseJSON,
          redirect:true
        })
      })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname:"/data",
        state: {
          user_data: this.state.user_data,
          handle: this.state.handle,
        }
      }} />
    }
    let userConfirmation
    if (this.state.confirmation_visible) {
      userConfirmation = <Confirmation user={this.state.user} onClick={this.handleConfirmClick}/>
    } else {
      userConfirmation = <div></div>
    }
    return (
      <div style={{ width: '75%', margin: 'auto', marginTop: '10%', height: 'auto' }}>
        <Jumbotron>
          <h1 style={{ textAlign: 'center' }}> ANALYZE TWEETS </h1>
          <div>
            <InputGroup size='lg' className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="screenNameSearch"
                placeholder="Screen Name"
                aria-label="ScreenName"
                aria-describedby="basic-addon1"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.handleSearchClick}>Search</Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Jumbotron>
        <div>
          {userConfirmation}  
        </div>
        <Nav className="justify-content-center text-center fixed-bottom">
          <Nav.Link href='/interesting_finds'>Check out these interesting finds!</Nav.Link>
        </Nav>
      </div>
    )
  }
}

export default HomePage