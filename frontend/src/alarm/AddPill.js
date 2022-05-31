import {Form, Card, Button} from "react-bootstrap";
import './AddPill.css';
import {Link} from "react-router-dom";
import CheckBox from './CheckBox.js';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function AddPill(){

    let navigate = useNavigate();

    let data = [];

    function addPill(){
        axios.post('', data)
            .then(function(res){

        })
            .catch(function(res){

        })
    }

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
                            <span>영양제 이름</span><input type="text" className="cardInput" /><br/><br/>
                            <span>총 수량(현재수량)</span><input type="number" className="cardInput" /><br/><br/>
                            <span>1회 복용량</span><input type="number" className="cardInput" /><br/><br/>
                            <span>복용 시간1</span><input type="time" className="cardInput"/><br/><br/>
                            <span>복용 시간2</span><input type="time" className="cardInput"/><br/><br/>
                            <span>복용 시간3</span><input type="time" className="cardInput"/><br/><br/>
                            <span>복용 주기</span>
                                <CheckBox/>
                            <br/>

                        </Form>
                    </div>
                </Card.Body>
            </Card>
            <br/>
            <div className="btnArea">
                <Button variant="primary" className="cardBtn" onClick={addPill()}>등 록</Button>
                <Button variant="danger" className="cardBtn" onClick={()=>{navigate(-1)}}>취 소</Button>
            </div>
        </div>
    );
}

export default AddPill;