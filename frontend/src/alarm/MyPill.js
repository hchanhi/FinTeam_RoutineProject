import './MyPill.css';
import {Card, Button} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";

function MyPill(){

    let [card, setCard]= useState([1,2,3,4]);

    function deletePill(index){
        let copy = [...card];
        copy.splice(index,1)
        setCard(copy);
    }


    return(
        <div style={{marginTop:'30px'}}>
            <br/>
            <br/>
            {card.map(function(card,index){
                return(
                    <div key={index}>
                        <Card className="pillCard">
                            <Card.Body>
                                <Card.Title>영양제{card}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">일2회/1정</Card.Subtitle>
                                <Card.Text>
                                    현재 수량 : 30<br/>
                                    알림 시간 : 09:00 20:00<br/>
                                    복용 주기 : 매일<br/>
                                    등록한 날짜 : 2022-05-30
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
    );
}

export default MyPill;