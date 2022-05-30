import './MyPill.css';
import {Card, Button} from "react-bootstrap";
import {useState} from "react";

function MyPill(){

    let [card, setCard]= useState([1,2,3]);


    return(
        <div>
            {card.map(function(card,index){
                return(
                    <div>
                        <Card className="card">
                            <Card.Body>
                                <Card.Title>영양제1</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">일2회/1정</Card.Subtitle>
                                <Card.Text>
                                    현재 수량 : 30<br/>
                                    알림 시간 : 09:00 20:00<br/>
                                    복용 주기 : 매일<br/>
                                    등록한 날짜 : 2022-05-30
                                </Card.Text>
                                <Button variant="outline-primary" className="cardBtn">수 정</Button>
                                <Button variant="outline-danger" className="cardBtn">삭 제</Button>
                            </Card.Body>
                        </Card>
                    </div>
                );
            })}

        </div>
    );
}

export default MyPill;