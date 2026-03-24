import axios from "axios"
import joi from "joi"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [user, setUser]=useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
    })
    const [error, setError] = useState({});
    const [spin, setSpin] = useState(false)
    const [errorList, setErrorList] = useState([]);

    let navigate = useNavigate();

    function validationInRegister() {
      let validation = joi.object({
        first_name: joi.string().min(3).max(20).required(),
        last_name: joi.string().min(3).max(20).required(),
        age: joi.number().min(5).max(25).required(),
        email: joi.string().email({tlds:{allow : ['com','net']}}),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
      })
      return validation.validate(user , {abortEarly: false})
    }

    function getUserData(eventInfo) {
    let UserData = {...user};
    UserData[eventInfo.target.name] = eventInfo.target.value;
    setUser(UserData)
    return console.log(UserData)
  }

    async function sendDataToApi (){
      let { data } = await axios.post(`https://movies-api.routemisr.com/signup`,user)
      if (data.message === 'success' ){
        setSpin(false)
        navigate ("/Login");
      }else{
        setSpin(false)
        setError(data.message);
      }
    }
    
    function registing(e) {
      e.preventDefault();
      let validationCheck = validationInRegister();
      if(validationCheck.error){
        setErrorList(validationCheck.error.details)
        setSpin(false)
      }else{
        sendDataToApi();
      }
      setSpin(true)
    }

  return (
    <>
    {errorList.map((err, index) => {
    if(err.context.label === "password"){
      return  <div key={index} className='alert alert-danger my-2'> Enter Valid Password </div>
    }else{
      return  <div key={index} className='alert alert-danger my-2'> {err.message} </div>
    }})}

    {error.length > 0 ? <div className='alert alert-danger my-2'> {error} </div> : ""}
    <form action="" onSubmit={registing} className='w-75 mx-auto mt-5'>
      <label htmlFor="first_name">first_name :</label>
      <input type="text" onChange={getUserData} className='form-control mb-3 mt-1' name='first_name' id='first_name'/>

      <label htmlFor="last_name">last_name :</label>
      <input type="text" onChange={getUserData} className='form-control mb-3 mt-1' name='last_name' id='last_name'/>

      <label htmlFor="age">age :</label>
      <input type="number" onChange={getUserData} className='form-control mb-3 mt-1' name='age' id='age'/>

      <label htmlFor="email">email :</label>
      <input type="email" onChange={getUserData} className='form-control mb-3 mt-1' name='email' id='email'/>

      <label htmlFor="password">password :</label>
      <input type="password" onChange={getUserData} className='form-control mb-3 mt-1' name='password' id='password'/>

      <button className='btn btn-info mt-3'> {spin ? <i className="fas fa-spinner fa-spin"></i> : "Register"}</button>
    </form>
    </>
  )
}
