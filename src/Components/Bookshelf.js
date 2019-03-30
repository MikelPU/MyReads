import React, { Component } from 'react'
import { getAll, update } from '../BooksAPI'
import Shelf from './Shelf'
import { shelvesList } from '../helpers/constants'

class Bookshelf extends Component {
  state = {
    books: []
  }
  componentDidMount(){
    this.fetchBooks()
  }

  /* After the component is created, the BooksAPI is queried to get all books of interest (WantToRead, Reading and Read)*/
  fetchBooks(){
    getAll().then((data) => {
      this.setState({books: data})
    })
  }
  
  handleBookShelfChange = (book, newShelf) => {
    book.props.books.shelf = newShelf;
    this.setState( (state) => ({
      books: state.books.filter( b => b.id !== book.props.books.id).concat([book.props.books])
    }))
    // Query to BooksAPI to update the info regarding the shelf
    update(book.props.books, newShelf); 
  }
  
  render() {
    const { books } = this.state                              
    return(
      <div>  
        {shelvesList.map(obj => 
         <Shelf 
           key={obj.name} 
           name={obj.name}
           books={books.filter(bs => bs.shelf === obj.category)}
           shelfType={obj.category}
           onBookShelfChange={this.handleBookShelfChange}
           />)
         }
      </div>
    )
  }
  
}

export default Bookshelf