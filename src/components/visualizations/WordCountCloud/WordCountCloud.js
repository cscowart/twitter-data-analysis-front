import React, { Component } from 'react'
import drawWordCountCloud from './helpers.js'

class WordCountCloud extends Component {
  componentDidMount() {
    drawWordCountCloud(this.props.data)
  }

  componentDidUpdate(prevProps) {
    drawWordCountCloud(this.props.data)
  }

  render() {
    return (
      <div className='wordCountCloud'></div>
    )
  }
}

export default WordCountCloud