import * as React from 'react';
import { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { Divider, Paper } from '@mui/material';
import { getNickName, isAuth } from "./jwtCheck";
import axios from "axios";

export default function CheckPill() {
    const [amChecked, setAmChecked] = React.useState([1]);
    const [noonChecked, setNoonChecked] = React.useState([1]);
    const [pmChecked, setPmChecked] = React.useState([1]);
    const [pillCheck, setPillCheck] = React.useState([]);
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);


    //아침
    const handleToggleAm = (amValue) => () => {
        const currentIndex = amChecked.indexOf(amValue);
        const newChecked = [...amChecked];
        let params = { nickname: nickname, supplementsName: amValue.supplementsName };
        if (currentIndex === -1) {
            newChecked.push(amValue);

            console.log("체크 " + amValue.supplementsName);
            axios.post("/api/supplements/check", params)
                .then(function (res) {
                    console.log("성공");
                    console.log(res.data);

                })
                .catch(function (err) {
                    console.log(err);

                });

        } else {
            newChecked.splice(currentIndex, 1);
            console.log("언체크 " + amValue.supplementsName);
            axios.delete("/api/supplements/uncheck", { data: params })
                .then(function (res) {
                    console.log("성공");
                    console.log(res.data);


                })
                .catch(function (err) {
                    console.log(err);

                });
        }

        setAmChecked(newChecked);

    };

    //점심
    const handleToggleNoon = (noonValue) => () => {
        const currentIndex = noonChecked.indexOf(noonValue);
        const newChecked = [...noonChecked];
        let params = { nickname: nickname, supplementsName: noonValue.supplementsName };
        if (currentIndex === -1) {
            newChecked.push(noonValue);
            console.log("체크 " + noonValue.supplementsName);
            axios.post("/api/supplements/check", params)
                .then(function (res) {
                    console.log("성공");
                    console.log(res.data);

                })
                .catch(function (err) {
                    console.log(err);

                });
        } else {
            newChecked.splice(currentIndex, 1);
            console.log("언체크 " + noonValue.supplementsName);
            axios.delete("/api/supplements/uncheck", { data: params })
                .then(function (res) {
                    console.log("성공");
                    console.log(res.data);


                })
                .catch(function (err) {
                    console.log(err);

                });
        }

        setNoonChecked(newChecked);

    };
    //저녁
    const handleTogglePm = (pmValue) => () => {
        const currentIndex = pmChecked.indexOf(pmValue);
        const newChecked = [...pmChecked];
        let params = { nickname: nickname, supplementsName: pmValue.supplementsName };
        if (currentIndex === -1) {
            newChecked.push(pmValue);
            console.log("체크 " + pmValue.supplementsName);
            axios.post("/api/supplements/check", params)
                .then(function (res) {
                    console.log("성공");
                    console.log(res.data);

                })
                .catch(function (err) {
                    console.log(err);

                });
        } else {
            newChecked.splice(currentIndex, 1);
            console.log("언체크 " + pmValue.supplementsName);
            axios.delete("/api/supplements/uncheck", { data: params })
                .then(function (res) {
                    console.log("성공");
                    console.log(res.data);

                })
                .catch(function (err) {
                    console.log(err);

                });
        }

        setPmChecked(newChecked);
    };

    function pill() {

        let params = { nickname: nickname };
        axios.get("/api/supplements/list", { params })
            .then(function (res) {
                console.log("성공");
                setPillCheck(res.data);
                console.log(res.data);


            })
            .catch(function (err) {
                console.log('실패');

            });

    }

    useEffect(() => {
        pill();
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <Paper elevation={6} sx={{ width: '140px', maxWidth: 360, borderRadius: '20px' }}>

                <List dense sx={{ width: '140px', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '20px' }}>
                    <ListItemText
                        sx={{ my: 0, textAlign: 'center' }}
                        primary="아침"
                        primaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: 'medium',
                            letterSpacing: 0,
                        }}
                    />
                    <Divider style={{ marginBottom: '5px' }} />
                    {pillCheck.map((amValue) => {
                        const labelId = `checkbox-list-secondary-label-${amValue}`;
                        return (
                            <div>
                                {
                                    amValue.slot == "아침" ? <div>
                                        <ListItem
                                            key={amValue}
                                            secondaryAction={
                                                <Checkbox
                                                    defaultChecked color="success"
                                                    edge="end"
                                                    onChange={handleToggleAm(amValue)}
                                                    checked={amChecked.indexOf(amValue) !== -1}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            }
                                            disablePadding
                                        >
                                            <ListItemButton>

                                                <ListItemText id={labelId} primary={amValue.supplementsName} />
                                            </ListItemButton>
                                        </ListItem>
                                    </div> :
                                        <div style={{ display: 'none' }}></div>
                                }
                            </div>
                        );
                    })}
                </List>
            </Paper>

            <Paper elevation={6} sx={{ width: '140px', maxWidth: 360, borderRadius: '20px' }}>
                <List dense sx={{ width: '140px', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '20px' }}>
                    <ListItemText
                        sx={{ my: 0, textAlign: 'center' }}
                        primary="점심"
                        primaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: 'medium',
                            letterSpacing: 0,
                        }}
                    />
                    <Divider style={{ marginBottom: '5px' }} />

                    {pillCheck.map((noonValue) => {
                        const labelId = `checkbox-list-secondary-label-${noonValue}`;
                        return (
                            <div>

                                {
                                    noonValue.slot == "점심" ? <div>
                                        <ListItem
                                            key={noonValue}
                                            secondaryAction={
                                                <Checkbox
                                                    defaultChecked color="success"
                                                    edge="end"
                                                    onChange={handleToggleNoon(noonValue)}
                                                    checked={noonChecked.indexOf(noonValue) !== -1}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            }
                                            disablePadding
                                        >
                                            <ListItemButton>

                                                <ListItemText id={labelId} primary={noonValue.supplementsName} />
                                            </ListItemButton>
                                        </ListItem>
                                    </div>
                                        : <div style={{ display: 'none' }}></div>
                                }
                            </div>
                        );
                    })}
                </List>
            </Paper>
            <Paper elevation={6} sx={{ width: '140px', maxWidth: 360, borderRadius: '20px' }}>
                <List dense sx={{ width: '140px', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '20px' }}>
                    <ListItemText
                        sx={{ my: 0, textAlign: 'center' }}
                        primary="저녁"
                        primaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: 'medium',
                            letterSpacing: 0,
                        }}
                    />
                    <Divider style={{ marginBottom: '5px' }} />
                    {

                        pillCheck.map((pmValue) => {
                            const labelId = `checkbox-list-secondary-label-${pmValue}`;
                            return (
                                <div>
                                    {

                                        pmValue.slot == "저녁" ?
                                            <div>
                                                <ListItem
                                                    key={pmValue}
                                                    secondaryAction={
                                                        <Checkbox
                                                            defaultChecked color="success"
                                                            edge="end"
                                                            onChange={handleTogglePm(pmValue)}
                                                            checked={pmChecked.indexOf(pmValue) !== -1}
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                        />
                                                    }
                                                    disablePadding
                                                >
                                                    <ListItemButton>

                                                        <ListItemText id={labelId} primary={pmValue.supplementsName} />
                                                    </ListItemButton>
                                                </ListItem>
                                            </div>
                                            :
                                            <div style={{ display: 'none' }}></div>
                                    }
                                </div>
                            );
                        })

                    }

                </List>
            </Paper>
        </div>
    );
}