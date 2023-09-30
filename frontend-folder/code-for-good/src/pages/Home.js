import React from 'react'
import '../styles/Home.css'
import AddEvent from './AddEvent'
import Decision from './Decision'
import Signup from '../components/Signup'


function Home() {
  return (

    <div className={'pageLayout'}>
      <h1>Home Page</h1>
      <p>
        Our project aims to help ACB expand and maintain their virtual volunteer-led programming, while maintaining accessibility for the blind and low vision community.
      </p>

      <Signup/>

    </div>
  )
}

export default Home