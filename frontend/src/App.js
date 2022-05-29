
import './App.css';
import { useEffect, useState} from "react";
import { Routes, Route, Link} from "react-router-dom";
import Main from "./Main.js";
import Alarm from "./alarm/Alarm.js";
import Reward from "./reward/Reward.js";
import User from "./user/User.js";
import Mypage from "./mypage/Mypage.js";

function App() {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetch("/api/hello",
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => {
          return response.json();
        })
        .then(function (data) {
          setMessage(data);
        });
  }, []);

  return (
      <div>
          <Routes>
              <Route path="/" element={<div><Main /></div>}/>
              <Route path="/user" element={<div><User /></div>}/>
              <Route path="/alarm" element={<div><Alarm /></div>}/>
              <Route path="/reward" element={<div><Reward /></div>}/>
              <Route path="/mypage" element={<div><Mypage /></div>}/>
          </Routes>

          <div>하단에 안녕하세요가 나오면 연결 된 것</div>
          <ul>
            {message.map((text, index) => <li key={`${index}-${text}`}>{text}</li>)}
          </ul>
          
          <Link to={"/user"}><span>유저</span></Link><br/><br/>
          <Link to={"/alarm"}><span>알람</span></Link><br/><br/>
          <Link to={"/reward"}><span>리워드</span></Link><br/><br/>
          <Link to={"/mypage"}><span>마이페이지</span></Link><br/><br/>

      </div>
  );
}

export default App;