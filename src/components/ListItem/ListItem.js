import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ListItem extends Component {
  render() {
    return (
      <div>
        <Link to={`/interesting_finds/${this.props.id}`}>{this.props.title}</Link>
        <p>{this.props.author}</p>
        <p>{this.props.date_created}</p>
      </div>
    )
  }
}

export default ListItem