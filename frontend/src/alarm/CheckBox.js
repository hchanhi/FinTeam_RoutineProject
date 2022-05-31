import {Form} from "react-bootstrap";
import {useState} from "react";


function CheckBox(){

    let [week, setWeek] = useState(['월', '화', '수', '목', '금', '토', '일']);


    return(
        <div>
            <div className="mb-3">
                {week.map(function (week,index){
                    return(

                            <Form.Check key={index}
                                inline
                                label={week}
                                name="group1"
                                type={'checkbox'}
                                id={week}
                            />

                    );
                })}
            </div>
        </div>
    );
}

export default CheckBox;