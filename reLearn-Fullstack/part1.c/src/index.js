import React , {useState}from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import { Button } from "./components/Button";
const Display = (props) => {
  return(
  <p>{props.counte}</p>
  )
}
const Notification = ({message}) => {
  if(message === null){
    return null
  }
  return (
    <div className = 'error'>
      {message}
    </div>
  )
}

const App = () => {
  const [counte,setCounte] = useState(0)
  const [errorMessage,setErrorMessage] = useState(null)
  const increasinglyByOne = () => setCounte(counte +1)
  const setZero = () => setCounte(0)
  const reduceCounte = () => {
    if(counte > 0){
      setCounte(counte - 1)
    }else{
      setErrorMessage('because counte is littler than zero, the counte can not be reduced')
      setTimeout( () => {
        setErrorMessage(null)
      },5000)
    }
  }
  // setInterval( () =>  setCounte(counte + 1) ,1000)
  // console.log('render...' , counte)
  return (
  <div className = 'counte'>
    <Notification message = {errorMessage}/>
    <Display counte = {counte}/>
    <Button handleClick = {increasinglyByOne}  name ='push'/>
    <Button handleClick = {setZero} name = 'zero'/>
    <Button handleClick = {reduceCounte} name = 'reduce'/>
  </div>
  
  )
}

ReactDOM.render(<App />, document.getElementById("root"));