import { Card} from "react-bootstrap";
import './Routine.css';
import {useState} from "react";

function Routine(){

    let [state, setState] = useState([]);

    return(
        <div>
            <br/>
            <br/>
            <br/>
            <h1>내 루틴</h1>
            <Card className="mainCard">
                <Card.Title>오늘 복용해야하는 영양제</Card.Title>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                        <span>비타민D</span>
                        <span>루테인</span>
                        <span>비오틴</span>
                    </Card.Subtitle>
                    <Card.Text>
                        남은 수량 : 30<br/>
                        알람 시간 : 14:00<br/>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Routine;