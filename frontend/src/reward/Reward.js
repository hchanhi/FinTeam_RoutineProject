import { useState, useEffect } from "react";
import styled from "styled-components";
import { isAuth } from "../jwtCheck";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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
width: 480px;
justify-content:center



`;
let Text = styled.div`

    margin-left:20px;
  h5 {
      color:orange
  }



`;

function Reward() {
    const token = JSON.parse(localStorage.getItem('accessToken'));

    let [bd, setBd] = useState([true, false, true, true, true, false, false, false, false]);
    let [rt, setRt] = useState([1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]);

    let navigate = useNavigate();

    useEffect(() => {
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
        <div style={{ height: '100vh' }} >
            <br /><br /><br />
            <Text>
                <h3 style={{
                    textAlign: 'center', color: '#58CCFF', fontWeight: '600',
                    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000'
                }} >리 워 드</h3>

                <h5>캡슐 테이블</h5>
                <span style={{ fontSize: '15px', color: 'gray' }}>얼마나 꾸준히 영양제를 복용했는지 알 수 있어요!</span>
            </Text>

            <div >
                <Wrapper >
                    {
                        rt.map(function (a, i) {
                            return (
                                <h1 key={i}>{rt[i] === 1 ? <div style={{ width: '30px', height: '30px', marginLeft: '10px' }}>
                                    <img src={require("../img/pill01.png").default} />
                                </div> :
                                    <div style={{ width: '30px', height: '30px', marginLeft: '10px' }}>
                                        <img src={require("../img/pill02.png").default} /></div>}</h1>
                            );
                        })

                    }
                </Wrapper>
            </div>
            <br />
            <Text>
                <h5>뱃지</h5>
                <span style={{ fontSize: '15px', color: 'gray' }}>비밀 퀘스트를 달성하면 뱃지를 모을 수 있어요!</span>
            </Text>

            <div style={{ width: "300px", textAlign: "center" }}>
                <WrapperBg>
                    {
                        bd.map(function (a, i) {
                            return (
                                <h1 key={i}>{bd[i] === true ? <Badge><img src={require("../img/badge00" + (i + 1) + ".png").default} /></Badge>
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