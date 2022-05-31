import { useState } from "react";

function Reward() {


    let [bd, setBd] = useState([true, false, true, false, true]);
    let [rt, setRt] = useState([1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]);
    return (
        <div>
            <br /><br /><br />
            <h1>리워드</h1>
            <h1>연속</h1>


            <div style={{ display: 'flex', width: "90%" }}>
                {
                    rt.map(function (a, i) {
                        return (
                            <h1>{rt[i] == 1 ? <div style={{ width: '30px', height: '30px', backgroundColor: 'skyblue', marginLeft: '10px' }}></div> :
                                <div style={{ width: '30px', height: '30px', backgroundColor: 'grey', marginLeft: '10px' }}></div>}</h1>
                        );
                    })

                }
            </div>

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