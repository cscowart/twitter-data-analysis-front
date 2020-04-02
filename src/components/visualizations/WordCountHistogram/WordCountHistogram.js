import React, { Component } from 'react'
import drawWordCountHistogram from './helpers.js'

class WordCountHistogram extends Component {
  componentDidMount() {
    drawWordCountHistogram(this.props.data, this.props.className)
  }

  componentDidUpdate(prevProps) {
    drawWordCountHistogram(this.props.data, this.props.className)
  }

  render() {
    return (
      <div className={this.props.className}></div>
    )
  }
}

export default WordCountHistogram