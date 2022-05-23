import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import EventListingPage from './Pages/EventListing'

function App () {
  return (
    <div className='App'>
      <BrowserRouter basename='https://haxceb.github.io/web-dev-assignment'>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/events/:artistName' element={<EventListingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
