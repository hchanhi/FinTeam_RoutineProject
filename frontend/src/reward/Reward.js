import { useState,useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faHouse, faCapsules, faArrowsRotate, faUserGear } from "@fortawesome/free-solid-svg-icons";
import {getNickName, isAuth} from "../jwtCheck";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

let Badge = styled.div`

img{
    width: 150px;
height: 150px;

}


`;
let Wrapper = styled.div`

display: flex;
flex-direction: column;
flex-wrap: wrap;
width: 30px;
height: 200px;
margin-left:20px



`;
let WrapperBg = styled.div`

display: flex;
flex-direction: row;
flex-wrap: wrap;
width: 500px;
justify-content:center



`;
let Text = styled.div`

    margin-left:20px




`;

function Reward() {
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);

    let [bd, setBd] = useState([true, false, true, true, true, false, false, false, false]);
    let [rt, setRt] = useState([1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]);

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


    return (
        <div >
            <br /><br /><br />
            <Text>
                <h4>리워드 <FontAwesomeIcon style={{ color: "black" }} className='icon' icon={faAward} /></h4>
                <br />
                <h3>루틴 필드</h3>
            </Text>

            <div >
                <Wrapper >
                    {
                        rt.map(function (a, i) {
                            return (
                                <h1 key={i}>{rt[i] == 1 ? <div style={{ width: '30px', height: '30px', backgroundColor: 'skyblue', marginLeft: '10px' }}></div> :
                                    <div style={{ width: '30px', height: '30px', backgroundColor: 'grey', marginLeft: '10px' }}></div>}</h1>
                            );
                        })

                    }
                </Wrapper>
            </div>
            <Text>
                <h3>뱃지</h3>
            </Text>

            <div style={{ width: "300px", textAlign: "center" }}>
                <WrapperBg>
                    {
                        bd.map(function (a, i) {
                            return (
                                <h1 key={i}>{bd[i] == true ? <Badge><img src={require("../img/badge00" + (i + 1) + ".png").default} /></Badge>
                                    : <Badge><img src={require("../img/qBadge.png").default} /></Badge>}</h1>

                            );
                        })

                    }
                </WrapperBg>

            </div>
            <br /><br /><br />
        </div>
    );
}

export default Reward;