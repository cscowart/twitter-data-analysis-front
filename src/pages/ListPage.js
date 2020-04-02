import React, { Component } from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import dataAnalysisAPI from '../api/dataAnalysisAPI.js'
import VisualList from '../components/VisualList/VisualList.js'

class ListPage extends Component {
  state = {
    graphics: [],
  }

  componentDidMount() {
    dataAnalysisAPI.fetchGraphicList()
      .then((apiResponseJSON) => {
        this.setState({
          graphics: apiResponseJSON
        })
      })
    
  }

  handleSearch = async (event) => {
    const textToSearchFor = event.target.value
    let jsonResponse = await dataAnalysisAPI.fetchGraphicListBySearch(textToSearchFor)
    if (textToSearchFor === '') {
      jsonResponse = await dataAnalysisAPI.fetchGraphicList()
    }
    console.log(jsonResponse)
    this.setState({
      graphics: jsonResponse
    })
  }
  

  render() {

    return (
      <div>
        <h1>Interesting Finds</h1>
        <Link to={`/`}>Home</Link>
        <FormGroup>
          <FormControl onChange={this.handleSearch} type='text' placeholder="Search Titles" />
        </FormGroup>
        <VisualList graphics={this.state.graphics}/>
      </div>
    )
  }
}

export default ListPage