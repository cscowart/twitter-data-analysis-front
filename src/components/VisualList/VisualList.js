import React, { Component } from 'react'
import ListItem from '../ListItem/ListItem.js'

class VisualList extends Component {

  render() {
    return (
      <div>
        {this.props.graphics.map((item, index) => {
          return <ListItem key={index} {...item}/>
        })} 
      </div>
    )
  }
}

export default VisualList