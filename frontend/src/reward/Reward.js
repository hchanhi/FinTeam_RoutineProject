import { useState } from "react";

function Reward() {


    let [bd, setBd] = useState([true, false, true, false, true]);
    return (
        <div>
            <br /><br /><br />
            <h1>리워드</h1>
            <h1>뱃지</h1>
            <div style={{ display: "flex", alignItems: 'center', width: "100px", height: "200px", textAlign: 'center', color: 'red' }}>
                {
                    bd.map(function (a, i) {
                        return (
                            <h1>{bd[i] == true ? "🎃" : "땡"}</h1>
                        );
                    })

                }
            </div>


        </div>
    );
}

export default Reward;