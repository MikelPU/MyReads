import React, { Component } from 'react'

class Book extends Component {
  
  
  handleShelfChange = (e) => {
    let newValue = e.target.value;
    this.props.booksShelfChange(this, newValue)
  }
  
  render() {
    // eslint-disable-next-line
    const {  image, name, author, widthImage, shelfType, books } = this.props;
	const authors = author.join(', ')
    return(
      <div>
      	<div className="book-top">
          <div className="book-cover" style={{ width: widthImage, height: widthImage*1.5, backgroundImage: `url(${image})` }}></div>
          <div className="book-shelf-changer">
            <select defaultValue={shelfType} onChange={this.handleShelfChange} >
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title" style={{width: widthImage}}>{name}</div>
        <div className="book-authors" style={{width: widthImage}}>{authors}</div>
      </div>

    )
  }
  
}

export default Book