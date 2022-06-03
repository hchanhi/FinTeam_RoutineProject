import './MyPill.css';
import {Card, Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getNickName, isAuth} from "../jwtCheck";
import axios from "axios";
import Swal from 'sweetalert2';

function MyPill(){
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);
    let [card, setCard]= useState([]);
    let navigate = useNavigate();
    let [state, setState]= useState(false);

    function mypill(){
        let params = {nickname:nickname};
        axios.get("/api/supplements/list", {params})
            .then(function(res){
                console.log("성공");
                setCard(res.data);
                console.log(res.data);
            })
            .catch(function(res){
                console.log('실패');

            })

    }
    function deletePill(index){
        let params = {id:(card[index]).id};
        axios.get("/api/supplements/delete", {params})
            .then(function(res){
                console.log("성공");
                setState(!state);
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
    },[state])


    return(
        <div className="page">
            <div className="page2">
            <br/>
            <br/>
            <br/>
            {card.map(function(card,index){
                return(
                    <div key={index}>
                        <Card className="pillCard">
                            <Card.Body>
                                <Card.Title>{card.supplementsName}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">1회/{card.singleDose}정</Card.Subtitle>
                                <Card.Text>
                                    현재 수량 : {card.quantity}<br/>
                                    알림 시간 : 09:00 20:00<br/>
                                    복용 주기 : 매일<br/>
                                    등록한 날짜 : {(card.supplementsCreated).substring(0,10)}
                                </Card.Text>
                                <Button variant="outline-primary" className="cardBtn">수 정</Button>
                                <Button variant="outline-danger" className="cardBtn" onClick={()=>{deletePill(index)}}>삭 제</Button>
                            </Card.Body>
                        </Card>
                    </div>
                );
            })}
            <div>
                <Link to={'/addpill'} style={{textDecoration:'none'}}><Button variant="warning" className="addBtn">영양제 추가</Button></Link>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            </div>
        </div>
    );
}

export default MyPill;