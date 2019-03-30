import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Search from './Components/Search'


class BooksApp extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path='/' component={Home} />
          <Route exact path='/search' component={Search} />

        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
