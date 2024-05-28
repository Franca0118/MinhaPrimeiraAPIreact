import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './paginas/header'
import Pric from './paginas/pricipal'
import Footer from './paginas/footer'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Header/>
  <Pric/>

  <Footer/>
  </React.StrictMode>,
)
