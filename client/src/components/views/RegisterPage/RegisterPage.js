import React,{useState} from 'react';
import Axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_actions';
function RegisterPage(props) {
  let navigate=useNavigate();
  const dispatch = useDispatch();
  const [Email,setEmail]=useState("");
  const [Password, setPassword]=useState("");
  const [Name,setName]=useState("");
  const [ConfirmPassword, setConfirmPassword]=useState("");

  const onEmailhandler=(event)=>{
    setEmail(event.currentTarget.value);
  }
  const onPasswordhandler=(event)=>{
    setPassword(event.currentTarget.value);
  }
  const onNamehandler=(event)=>{
    setName(event.currentTarget.value);
  }
  const onConfirmPasswordhandler=(event)=>{
    setConfirmPassword(event.currentTarget.value);
  }
  const onSubmitHandler=(event)=>{
    event.preventDefault();

    if(Password!==ConfirmPassword){
      return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
    }
    let body={
      email:Email,
      password:Password,
      name:Name,
    }
    dispatch(registerUser(body))
      .then(response=>{
        if(response.payload.success){
          navigate("/LoginPage")
        }else{
          alert("Failed to sign up")
        }
      });//redux 사용

    
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width:'100%', height:'100vh'
    }}>
      <form style={{display:'flex',flexDirection:'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailhandler} />
        <label>Name</label>
        <input type="text" value={Name} onChange={onNamehandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordhandler} />
        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordhandler} />
        
        <br/>
        <button type="submit">
          회원가입
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
