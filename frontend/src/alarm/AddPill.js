import {Form, Card, Button} from "react-bootstrap";
import './AddPill.css';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {useState} from "react";
import {getNickName, isAuth} from '../jwtCheck.js';
import {initializeApp} from "firebase/app";
import {getMessaging, getToken, onMessage} from "firebase/messaging";

function AddPill(){
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);

    let navigate = useNavigate();
    let [pillname, setPillname] = useState('');
    let [nownumber, setNownumber] = useState(0);
    let [eatnumber, setEatnumber] = useState(0);
    let [eattime, setEattime] = useState('');

    const config = {
        apiKey: "AIzaSyDIeKgdotnu9zvRvYNKnVry8Nuw6r7s7_8",
        authDomain: "pillgood-138b1.firebaseapp.com",
        projectId: "pillgood-138b1",
        storageBucket: "pillgood-138b1.appspot.com",
        messagingSenderId: "63398292257",
        appId: "1:63398292257:web:bdf80d64a9a75d249d6c60",
        measurementId: "G-6KFN50FF08"
    };
    const app = initializeApp(config);

    const messaging = getMessaging(app);



    function subscribeTokenToTopic(token, topic) {
        fetch('https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/' + topic, {
            method: 'POST',
            headers: new Headers({

                'Authorization': 'key=' + 'AAAADsLVKyE:APA91bHI_UNkgq0sEAf5UcR01heTflDp8PDs8CI5Lpb3G8HHLUNv05N1STvF0OaAN_W0jVXoHTFdxO_KAkw4Gc5fdrvPxNfnzjtc9IpjJPxJz6fcHQUEpY9W-Lr7wJH-TpgII5O8_84E'
            })
        }).then(response => {
            if (response.status < 200 || response.status >= 400) {
                throw 'Error subscribing to topic: ' + response.status + ' - ' + response.text();
            }
            console.log('Subscribed to "' + topic + '"');
        }).catch(error => {
            console.error(error);
        });
    }

    function Topic1(Token) {
        subscribeTokenToTopic(Token, "MORNING");
    }
    function Topic2(Token) {
        subscribeTokenToTopic(Token, "LUNCH");
    }
    function Topic3(Token) {
        subscribeTokenToTopic(Token, "DINNER");
    }


    onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        // ...
    });
    // function selectDay(e){
    //     let copy = [...eatday,e];
    //     setEatday(copy);
    // }
    // function unselectDay(e){
    //     let copy = [...eatday];
    //     for(let i=0; i<copy.length;i++){
    //         if(copy[i]==e){
    //             copy.splice(i,1);
    //             i--;
    //         }
    //     }
    //     setEatday(copy);
    // }

    let body ={
        supplementsName: pillname,
        quantity:nownumber,
        singleDose:eatnumber,
        nickname :nickname,
        slot : eattime
        }

    function addPill() {
        axios.post("api/supplements/add", body)
            .then(function(res){
            console.log('성공');
            navigate('/mypill');
                getToken(messaging, {vapidKey: 'BOUH7VnfqJhHUd9CXxw1_QwjB_lScFbFAgPb9P-JOcNE8VavuYuOgSw5s9dLiTZfS0yYGv5RI1dCkYSeLxxvmmI'})
                    .then((currentToken) => {
                        if (currentToken) {
                            if(body.slot=='아침'){
                                Topic1(currentToken);
                            } else if(body.slot=='점심'){
                                Topic2(currentToken);
                            } else if(body.slot=='저녁'){
                                Topic3(currentToken);
                            }
                            console.log('허가!');
                            console.log(currentToken);
                            // Send the token to your server and update the UI if necessary
                            // ...
                        } else {
                            // Show permission request UI
                            console.log('No registration token available. Request permission to generate one.');
                            // ...
                        }
                    }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                    // ...
                });

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
                            <span>복용 시간</span>
                            <div className="mb-3">
                                {/*{week.map(function (week,index){*/}
                                {/*    return(*/}
                                {/*        <div className="checkbox_area" key={index}>*/}
                                {/*        <span style={{margin:'15px'}}>{week}</span>*/}
                                {/*        <input key={index} type='checkbox' id={week} value={week} onChange={(e)=>*/}
                                {/*        { if(e.target.checked){selectDay(e.target.value)}*/}
                                {/*        else {unselectDay(e.target.value)}}}/>*/}
                                {/*        </div>*/}
                                {/*    );*/}
                                {/*})}*/}

                                <input type="radio" name="time" value="아침" onChange={(e)=>{setEattime(e.target.value)}} /> 아침
                                <input type="radio" name="time" value="점심" onChange={(e)=>{setEattime(e.target.value)}} /> 점심
                                <input type="radio" name="time" value="저녁" onChange={(e)=>{setEattime(e.target.value)}} /> 저녁
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