import {useEffect} from "react";
import {getNickName, isAuth} from "../jwtCheck";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


function User(){
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);
    let navigate = useNavigate();

    useEffect(()=>{
        if (!isAuth(token)) {
            Swal.fire({
                confirmButtonColor: '#2fbe9f',

                confirmButtonText: '확인',
                text: '로그인 후 이용하실 수 있어요😥', // Alert 제목

            });
            navigate('/login');
        }
    }, []);

    return(
        <div>
            <br/>
            <br/>
            <br/>
            <h1>회원정보</h1>
        </div>
    );
}

export default User;