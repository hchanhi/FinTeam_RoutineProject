import React from "react";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'; 
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'; 

function login(){

return (
    <Container component="main" maxWidth="xs">
        <Box sx={{marginTop:8,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'}}>
        <Typography component="h1" variant="h5">로그인</Typography>
        <TextField label="Email Address" required fullWidth name="email" autoComplete="email" qutoFocus margin="normal"/>
        <TextField label="Password" type="password" required fullWidth name="password" autoComplete="current-password" margin="normal" />
        <Checkbox value="remember" color="primary" />
        <Button type="submit" fullWidth variant="contained" sx={{mt:3, mb:2}}>로그인</Button>
        <Grid container>
            <Grid item xs> 
            <Link>아이디|비밀번호 찾기</Link> 
            </Grid>
            <Grid item>
            <Link>회원가입하기</Link>
            </Grid>
        </Grid>
        </Box>
    </Container>

   

);
};

export default login;