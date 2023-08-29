import './App.css'
// import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import HomePage from './views/HomePage.tsx/HomePage'

function App() {
  // const [count, setCount] = useState(0)

  const router =  createBrowserRouter([
    {
      path:'/',
      element: <HomePage />
    },
  ])

  return (
    <div className="App">
      <RouterProvider router= { router } />
    </div>
  )
}

export default App
