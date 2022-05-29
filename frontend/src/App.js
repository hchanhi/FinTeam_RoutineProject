
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
          
          <Link to={"/user"}><h4>유저</h4></Link>
          <Link to={"/alarm"}><h4>알람</h4></Link>
          <Link to={"/reward"}><h4>리워드</h4></Link>
          <Link to={"/mypage"}><h4>마이페이지</h4></Link>

      </div>
  );
}

export default App;