import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import dataAnalysisAPI from '../api/dataAnalysisAPI'
import Graphic from '../components/Graphic/Graphic'

class DataPage extends Component {
  state = {data:{}}

  componentDidMount() {
    dataAnalysisAPI.fetchGraphicByID(this.props.match.params.findID)
      .then((response) => this.setState({
        data:response
      }))
  }

  render() {

    return (
      <div>
        <Link to={`/`}>Home</Link>
        <Link style={{float:'right'}} to={`/interesting_finds`}>Back</Link>
        <Graphic details={this.state}/>
      </div>
    )
  }
}

export default DataPage