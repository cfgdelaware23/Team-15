import React from 'react'
import '../styles/Home.css'
import AddEvent from './AddEvent'
import Decision from './Decision'
import UserSignup from '../components/UserSignup'


function Home() {
  return (

    <div className='pageLayout'>
      <h1>The American Council of the Blind (ACB)</h1>
      <p>
        Our project aims to help ACB expand and maintain their virtual volunteer-led programming, while maintaining accessibility for the blind and low vision community.
      </p>

      <UserSignup/>

    </div>
  )
}

export default Home