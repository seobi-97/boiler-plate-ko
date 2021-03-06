import React,{useState} from 'react';
import Axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_actions';
import Auth from '../../../hoc/auth';

function LoginPage(props){
  let navigate=useNavigate();
  const dispatch = useDispatch();
  const [Email,setEmail]=useState("");
  const [Password, setPassword]=useState("");

  const onEmailhandler=(event)=>{
    setEmail(event.currentTarget.value);
  }
  const onPasswordhandler=(event)=>{
    setPassword(event.currentTarget.value);
  }
  const onSubmitHandler=(event)=>{
    event.preventDefault();

    let body={
      email:Email,
      password:Password,
    }
    dispatch(loginUser(body))
      .then(response=>{
        if(response.payload.loginSuccess){
          navigate('/')
        }else{
          alert('Error')
        }
      });//redux 사용

    
  }

  return(
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width:'100%', height:'100vh'
    }}>
      <form style={{display:'flex',flexDirection:'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailhandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordhandler} />
        <br/>
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Auth(LoginPage,false);