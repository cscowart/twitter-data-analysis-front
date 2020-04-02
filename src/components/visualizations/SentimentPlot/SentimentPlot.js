import React, { Component } from 'react'
import drawSentimentPlot from './helpers.js'

class SentimentPlot extends Component {
  componentDidMount() {
    drawSentimentPlot(this.props.data)
  }

  componentDidUpdate(prevProps) {
    drawSentimentPlot(this.props.data)
  }

  render() {
    return (
      <div className='SentimentPlot'></div>
    )
  }
}

export default SentimentPlot