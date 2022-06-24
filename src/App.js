import React from 'react'
import { Route, Routes } from 'react-router'
import { Header, MainContainer, CreateContainer } from './components'
import { AnimatePresence } from 'framer-motion'

const App = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-full h-auto flex flex-col bg-primary">
      <Header/>

      <main className="mt-2 md:mt-4 px-4 md:px-16 py-4 w-full">
      <Routes>
        <Route path="/" element={<MainContainer/>}></Route>
        <Route path="/createItem" element={<CreateContainer/>}></Route>
      </Routes>
      </main> 

    </div>  
    </AnimatePresence>
  )
}

export default App