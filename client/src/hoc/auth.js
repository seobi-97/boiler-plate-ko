import { Axios } from 'axios';
import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_actions';
import {useNavigate} from "react-router-dom";

export default function(SpecificComponent, option, adminRoute=null){
  //null => 아무나 출입이 가능한 페이지
  //true => 로그인한 유저만 출입이 가능한 페이지
  //false => 로그인한 유저는 출입이 불가능한 페이지

  function AuthenticationCheck(props){
    const dispatch=useDispatch();
    let navigate=useNavigate();
    useEffect(()=>{
      dispatch(auth()).then(response=>{
        console.log(response)

        //로그인 하지 않은 상태
        if(!response.payload.isAuth){
          if(option){
            navigate('/')
          }
        }
        //로그인 한 상태
        else{
          if(adminRoute && !response.payload.isAdmin){
            navigate('/')
          }else{
            if(option===false)
            navigate('/')
          }
        }
      })
    },[])
    return (
      <SpecificComponent/>
    )
  }

  return AuthenticationCheck
}