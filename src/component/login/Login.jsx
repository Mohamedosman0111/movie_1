import joi from 'joi';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login({saveUserToken}) {
let navigate = useNavigate();
const [spin, setSpin] = useState(false);
const [error, setError] = useState({});
const [errorList, setErrorList] = useState([]);
const [user, setuser] = useState({
  email : "",
  password : "",
});

  function getUserData(eventInfo) {
    let userData = {...user};
    userData[eventInfo.target.name] = eventInfo.target.value;
    setuser(userData)
  }

  function validationInLogin() {
    let validation = joi.object({
      email:joi.string().email({tlds:{allow : ['com','net']}}),
      password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
    })
    return validation.validate(user, {abortEarly: false})
  }

  async function sentUserDataToApi (){
    let {data} = await axios.post("https://movies-api.routemisr.com/signin" ,user)
    if(data.message === "success"){
      setSpin(false);
      localStorage.setItem("userToken" , data.token);
      saveUserToken();
      navigate("/Home")
    }
    else{
      setSpin(false)
      setError(data.message)
    }
  }

  function registing(e) {
    e.preventDefault();
    let validationCheck = validationInLogin();
    if(validationCheck.error){
      setSpin(false)
      setErrorList(validationCheck.error.details)
    }else{
      sentUserDataToApi();
    }
    setSpin(true)
  }

  return (
    <div>
      {errorList.map((err, index) => {
        if(err.context.label === "password"){
          return  <div key={index} className='alert alert-danger my-2'> Wrong Password </div>
        }else{
          return  <div key={index} className='alert alert-danger my-2'> {err.message} </div>
        }
      })}

      {error.length > 0 ? <div className='alert alert-danger my-2'> {error} </div>:""}

      <form action="" onSubmit={registing} className='w-75 mx-auto'>
        <label htmlFor="email">Email :</label>
        <input type="email" onChange={getUserData} className='form-control mt-1 mb-3' name="email" id="email"/>

        <label htmlFor="password">Password :</label>
        <input type="password" onChange={getUserData} className='form-control mt-1 mb-3' name="password" id="password"/>

        <button className='btn btn-info mt-3' type='submit'>
          {spin ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>
      </form>
    </div>
  )
}
