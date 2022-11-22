import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { auth } from '../_actions/user_actions'
import { useNavigate } from "react-router-dom"

export default function (SpecificComponent, option, adminRoute = null) {

    //option : null-아무나, true-로그인한 유저만, false-로그인 안한 유저만
    //adminRoute : true일 경우 - 관리자만 접근 가능한 경우
    function AuthenticationCheck (props){
        const navigate = useNavigate();

        const dispatch = useDispatch();

        useEffect (()=> {
            dispatch(auth()).then(response => {
                if(!response.payload.isAuth) {//로그인 하지 않은 상태
                    if(option) {//로그인 하지 않은 유저가, 로그인 된 유저만 접근 가능한 곳애 접근 시도
                        navigate('/login')
                    }
                }else {//로그인한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        //admin이 아닌데 admin만 접근 가능한 페이지로 접근 시도시
                        navigate('/')
                    }else{
                        if(option === false){//로그인 한 유저가, 로그인 안 한 유저만 접근 가능한 곳으로 접근 시도시
                            navigate('/')
                        }
                    }
                }

            })
        },[])

        return (
            <SpecificComponent/>
        )
    }

    return AuthenticationCheck;
}