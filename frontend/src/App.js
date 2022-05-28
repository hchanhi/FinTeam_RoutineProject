
import './App.css';
import { useEffect, useState} from "react";
import { Routes, Route, Link} from "react-router-dom";

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
              <Route />
              <Route />
              <Route />
          </Routes>

          <div>하단에 안녕하세요가 나오면 연결 된 것</div>
          <ul>
            {message.map((text, index) => <li key={`${index}-${text}`}>{text}</li>)}
          </ul>

      </div>
  );
}

export default App;