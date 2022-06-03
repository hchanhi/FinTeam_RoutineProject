import { Card} from "react-bootstrap";
import './Routine.css';
import {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
import {getNickName, isAuth} from "../jwtCheck";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

function Routine(){
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);
    let [pill, setPill] = useState([1,2,3]);
    let navigate = useNavigate();


    let params = {nickname:nickname};
    function mypill(){
        axios.get("/api/supplements/list", {params})
            .then(function(res){
                console.log("성공");
                setPill(res.data);
                console.log(res.data);
            })
            .catch(function(res){
                console.log('실패');

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
        }
    }, []);
    useEffect(()=>{
        mypill();
    },[])
    return(
        <div className="page">
            <br/>
            <br/>
            <br/>
            <h1>내 루틴</h1>


                    <div>
                        <Card className="mainCard">
                            <Card.Title>오늘 복용해야하는 영양제</Card.Title>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {pill.map(function(pill,index) {
                                        return (
                                            <div>
                                            <span key={index}>{pill.supplementsName}</span>
                                            </div>
                                        );
                                    })}

                                </Card.Subtitle>
                                <Card.Text>
                                    남은 수량 : 30<br/>
                                    알람 시간 : 14:00<br/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
        </div>
    );
}

export default Routine;