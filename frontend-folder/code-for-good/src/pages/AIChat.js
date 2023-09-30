import { useState } from 'react'
import Note from './Note'
import Header from '../components/Header'
import {REACT_APP_MY_API_KEY} from '../api.js'
import "../styles/AIChat.css";

const API_KEY = REACT_APP_MY_API_KEY;


function App() {
  const [userdata, setuserdata] = useState({firstname: '', lastname: '', problem:''})
  const [notes,setnotes] = useState([])
  const [openaians, setopenaians] = useState('Any questions? Ask away!')
  const defaultTxt = "Any questions? Ask away!";

  console.log(userdata)

  function handlechange(event){
    const {name,value} = event.target 
    setuserdata(prevuserdat =>{
      return {
        ...prevuserdat,
        [name] : value
      }
    } )
  }

  async function callopenai(){
    console.log("calling the api")
    setopenaians("Loading...");

    const userDataString = JSON.stringify(userdata);

    const APIBody = {
      "model": "gpt-4",
      "messages": [
        {
          "role": "system",
          "content": "You are a life coach. Your client, [User's First Name], [User's Last Name], is facing the problem of [User's Problem]. Please provide practical advice and solutions that [User's First Name] can easily implement to address this issue.Just state the solution, no need for intro. Say their  Dear first and last name, and then provide 2 consise solutions"
        },
        {
          "role": "user",
          "content": userDataString  // Convert userdata to a string
        }
      ],
      "temperature": 0,
      "max_tokens": 100,
      "top_p": 1.0,
      "frequency_penalty": 0.0,
      "presence_penalty": 0.0
    };
    
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
      },
      body: JSON.stringify(APIBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      setopenaians(data.choices[0].message.content);
    });
  }

  function createnewnote(){
    const newnote = {
      firstname: userdata.firstname,
      lastname: userdata.lastname,
      problem: userdata.problem,
      answer: openaians
    }
    setnotes(prevnotes => [newnote, ...prevnotes])
  }


  const rendernotes = notes.map(note => <Note key={note.id} firstname={note.firstname} lastname={note.lastname} problem={note.problem} answer={note.answer}/>)
  console.log(rendernotes)
  
  return (
    <div><Header/>
    <div className='background' id="aiChat">
      <div className='aiChat'>
        <div className="questionTitle" id='title'>Ask Your Question Below!</div>
        <div className="inputcontainer">
        <input onChange={handlechange} name="firstname" value={userdata.firstname} className='firstitem' type="text" placeholder='First Name:'/>
        <input onChange={handlechange} name="lastname" value={userdata.lastname} className='seconditem' type="text" placeholder='Last Name:'/>
        </div>
        <div className="probleminputdiv">
        <input className="probleminput" type="text" placeholder="Describe your Issue:" onChange={handlechange} name="problem" value={userdata.problem}/>
        </div>
        
        <button className='submitbutton' onClick={callopenai}>Submit</button>
        <div className='subansbutton'>
          <div className='answer'>
            {openaians && <div className="textareadiv">{openaians}</div>}
          </div>
        </div>
        {/*<div>
          {openaians !== defaultTxt && <button className="savebutton" onClick={createnewnote}>Save</button>}
          <div className='savedcontainer'>
            {rendernotes}
          </div>
        </div>*/}
      </div>
    </div>
    </div>
  )
}

export default App 