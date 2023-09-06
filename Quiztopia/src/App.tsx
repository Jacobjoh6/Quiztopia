import './App.css'
// import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import LogPage from './views/LogPage/LogPage'
import MapPage from './views/MapPage/MapPage'
import QuizPage from './views/QuizPage/QuizPage'
import HomePage from './views/HomePage/HomePage'

const router =  createBrowserRouter([
  {
    path:'/',
    element: <HomePage />
  },
  {
    path:'/log',
    element: <LogPage />
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
