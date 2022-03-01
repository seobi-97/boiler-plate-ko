import React,{useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function LandingPage(){
  let navigate=useNavigate();

  useEffect(()=>{
    axios.get('/api/hello')
    .then(response=>{console.log(response)})
  })

  const onClickHandler=()=>{
    axios.get('/api/user/logout')
      .then(response=>{
        if(response.data.success){
          navigate('/')
        }else{    
          alert('logout Error')
        }}
      )
  }
  return(
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width:'100%', height:'100vh'
    }}>
      <h2>시작 페이지</h2>
      <br></br>
      <button onClick={onClickHandler}>
        로그아웃
      </button>
    </div>
  )
}

export default LandingPage