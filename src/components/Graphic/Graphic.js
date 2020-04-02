import React, { Component } from 'react'
import injectHTML from './helpers'


class Graphic extends Component {

  // componentDidMount(){
  //   injectHTML(this.props.details)
  // }

  componentDidUpdate(){
    injectHTML(this.props.details)
  }

  render() {
    return (
      <div>
        <h1>{this.props.details.data.title}</h1>
        <h2>By {this.props.details.data.author}</h2>
        <p>{this.props.details.data.date_created}</p>
        <div id='graphic'></div>
      </div>

    )
  }
}

export default Graphic