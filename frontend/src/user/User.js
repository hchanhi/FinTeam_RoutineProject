import {useEffect, useState} from "react";
import {getNickName, isAuth, getId} from "../jwtCheck";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function User(){
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);
    const userId = getId(token);
    let navigate = useNavigate();

    let [ user, setUser] = useState([]);


    function getUser(){
        axios.get("/api/users/" + userId, { params: { id: userId } })
            .then(function(res){
                setUser(res.data);
            })
    }



    useEffect(()=>{
        if (!isAuth(token)) {
            Swal.fire({
                confirmButtonColor: '#2fbe9f',

                confirmButtonText: '확인',
                text: '로그인 후 이용하실 수 있어요😥', // Alert 제목

            });
            navigate('/login');
        } else{
            getUser();
        }

    }, []);

    return(
        <div>
            <br/>
            <br/>
            <br/>
            <h1>회원정보</h1>
            이메일 : {user.email} <br/>
            닉네임 : {user.nickname}

        </div>
    );
}

export default User;