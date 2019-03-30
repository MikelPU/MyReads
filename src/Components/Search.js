import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAll, update, search } from '../BooksAPI'
import Book from './Book'
import { searchTerms } from '../helpers/constants'

export class Search extends Component {
  state = {
    books: [],
    booksOfInterest: [],
    query: ''
  }

  componentDidMount(){
    this.fetchBooks()
  }

  /* After the component is created, the BooksAPI is queried to get all books of interest (WantToRead, Reading and Read)*/
  fetchBooks(){
    getAll().then((data) => {
      this.setState({booksOfInterest: data})
    })
  }
  
  handleBookShelfChange = (book, newShelf) => {
    book.props.books.shelf = newShelf;
    // Query to BooksAPI to update the info regarding the book added to a different shelf
    update(book.props.books, newShelf).then(console.log(`New book added to ${newShelf}`)); 
  }
    
   updateQuery = event => {
     search(event.target.value).then(books => books ? this.setState({ books }) : []);
     this.setState({query: event.target.value})
   }
  
  render() { 
    const { books, booksOfInterest, query } = this.state
	// Filter the books of interest (if any) provided in the Search response. This reduce (statistically) the later operation when passing the props
    const filteredBooks = books.length && booksOfInterest.length 
		? booksOfInterest.filter(bookInt => books.find( book => book.title === bookInt.title ))
		: [];
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.updateQuery}
              />
          </div>
        </div>
        <div className="search-books-results">
          { query.length === 0 &&  ( //initial state when no input is given
            <h3>Please, introduce a proper term to start the book search.</h3>
          )}
          { books.error &&  ( //error is included in the response when no books are matched the query
            <div>
              <h3>Not found! Introduce a term accordingly to the following SEARCH_TERMS. Thanks!</h3>
              {searchTerms.map(word =>
                               ` ${word} `                
              )}
            </div>
          )}
          {!books.error && query.length > 0 && ( //If no error is sent in the response and query is not empty, show the books
            <ol className="books-grid">
              {books.map(obj => 
                         <Book 
                           books={obj}
                           widthImage={128}
                           booksShelfChange={this.handleBookShelfChange}
                           /* Send the following props in addition to the main object 'books={obj}'. 
                           This way, we decoupled info for future changes--> i.e passing the thumbnail image from different URL*/
                           key={obj.id} 
                           image={obj.imageLinks ? obj.imageLinks.smallThumbnail : null}
                           name={obj.title}
                           author={obj.authors}
                           // Whether a filtered book is match the current searched book, the proper Shelf is added. 'none' for no shelf. 
                           shelfType={ filteredBooks.find( book => book.title === obj.title) ? (filteredBooks.find( book => book.title === obj.title).shelf) : 'none'}

                           />)
                         }
            </ol>
          )}
        </div>
      </div>
    )
  }
  
}

export default Search