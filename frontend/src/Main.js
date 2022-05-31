import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";


let Wrapper = styled.div`
margin: auto;
marginTop: 50px;
width: 90%;
height: 100%;
`;


function Main() {
    return (
        <Wrapper style={{ marginTop: "30px" }}>
            <br /><br />
            <h1>메인</h1>
        </Wrapper >
    );
}

export default Main;