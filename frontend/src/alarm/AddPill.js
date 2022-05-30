import {InputGroup, FormControl, Card} from "react-bootstrap";


function AddPill(){
    return(
        <div className="page">
            <br/>
            <br/>
            <br/>
            <form>
                <h1>영양제 등록하기</h1>
                <span>영양제 이름</span><input/><br/>
                <span>총 수량(현재수량)</span><input/><br/>
                <span>1회 복용량</span><input/><br/>
                <span>복용 시간</span><input/><br/>
                <span>복용 주기</span><input/><br/>
                <button type='submit'>등록</button>
            </form>
        </div>
    );
}

export default AddPill;