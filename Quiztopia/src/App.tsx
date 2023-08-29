import './App.css'
// import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import HomePage from './views/HomePage/HomePage'
import MapPage from './views/MapPage/MapPage'
import QuizPage from './views/QuizPage/QuizPage'

const router =  createBrowserRouter([
  {
    path:'/',
    element: <HomePage />
  },
  {
    path:'/map',
    element: <MapPage />
  },
  {
    path:'quiz',
    element: <QuizPage />
  }
])

function App() {
  // const [count, setCount] = useState(0)


  return (
    <div className="App">
      <RouterProvider router= { router } />
    </div>
  )
}

export default App
