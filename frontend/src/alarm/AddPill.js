import {Form, Card, Button} from "react-bootstrap";
import './AddPill.css';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {useState} from "react";
import { getNickName } from '../jwtCheck.js';

function AddPill(){
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);

    let navigate = useNavigate();
    let [pillname, setPillname] = useState('');
    let [nownumber, setNownumber] = useState(0);
    let [eatnumber, setEatnumber] = useState(0);
    let [eattime1, setEattime1] = useState('');
    let [eattime2, setEattime2] = useState('');
    let [eattime3, setEattime3] = useState('');
    let [eatday, setEatday]=useState('');
    let [week, setWeek] = useState(['월', '화', '수', '목', '금', '토', '일']);

    function selectDay(e){
        let copy = [...eatday,e];
        setEatday(copy);
    }
    function unselectDay(e){
        let copy = [...eatday];
        for(let i=0; i<copy.length;i++){
            if(copy[i]==e){
                copy.splice(i,1);
                i--;
            }
        }
        setEatday(copy);
    }

    let body ={
        supplementsName: pillname,
        quantity:nownumber,
        singleDose:eatnumber,
        nickname :nickname
        }

    function addPill() {
        axios.post("api/supplements/add", body)
            .then(function(res){
            console.log('성공');
            navigate('/mypill');
        })
        .catch(function(res){
            console.log('실패');
        })};


    return(
        <div className="page">
            <br/>
            <br/>
            <br/>
            <Card className="addCard">
                <Card.Body>
                    <Card.Title>영양제 등록하기</Card.Title>
                    <div>
                        <Form>
                            <span>영양제 이름</span><input type="text" className="cardInput" onChange={(e)=>{setPillname(e.target.value)}}/><br/><br/>
                            <span>총 수량(현재수량)</span><input type="number" className="cardInput" onChange={(e)=>{setNownumber(e.target.value)}}/><br/><br/>
                            <span>1회 복용량</span><input type="number" className="cardInput" onChange={(e)=>{setEatnumber(e.target.value)}}/><br/><br/>
                            <span>복용 시간1</span><input type="time" className="cardInput" onChange={(e)=>{setEattime1(e.target.value)}}/><br/><br/>
                            <span>복용 시간2</span><input type="time" className="cardInput" onChange={(e)=>{setEattime2(e.target.value)}}/><br/><br/>
                            <span>복용 시간3</span><input type="time" className="cardInput" onChange={(e)=>{setEattime3(e.target.value)}}/><br/><br/>
                            <span>복용 주기</span>
                            <div className="mb-3">
                                {week.map(function (week,index){
                                    return(
                                        <div className="checkbox_area" key={index}>
                                        <span style={{margin:'15px'}}>{week}</span>
                                        <input key={index} type='checkbox' id={week} value={week} onChange={(e)=>
                                        { if(e.target.checked){selectDay(e.target.value)}
                                        else {unselectDay(e.target.value)}}}/>
                                        </div>
                                    );
                                })}
                            </div>
                            <br/>

                        </Form>
                    </div>
                </Card.Body>
            </Card>
            <br/>
            <div className="btnArea">
                <Button variant="primary" className="cardBtn" onClick={addPill}>등 록</Button>
                <Button variant="danger" className="cardBtn" onClick={()=>{navigate(-1)}}>취 소</Button>
            </div>
        </div>
    );
}

export default AddPill;