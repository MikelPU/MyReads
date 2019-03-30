import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component {
  
  handleBookShelfChange = (book, shelf) => {
    this.props.onBookShelfChange(book, shelf);
  }
  
 render() {
  
   const { name, books } = this.props;
   return(
     <div className="bookshelf">
       <h2 className="bookshelf-title">{name}</h2>
       <div className="bookshelf-books">
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
                        shelfType={obj.shelf}
                        />)
                      }
         </ol>
       </div>
     </div> 
   )
 }
}

export default Shelf