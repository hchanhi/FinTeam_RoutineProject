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
    const [checked, setChecked] = React.useState([1]);
    const [pillCheck, setPillCheck] = React.useState([]);
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);


    //아침
    const handleToggleAm = (amValue) => () => {
        const currentIndex = checked.indexOf(amValue.supplementsName);
        const newChecked = [...checked];
        let params = { nickname: nickname, supplementsName: amValue.supplementsName };
        if (currentIndex === -1) {
            newChecked.push(amValue.supplementsName);

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

        setChecked(newChecked);

    };

    //점심
    const handleToggleNoon = (noonValue) => () => {
        const currentIndex = checked.indexOf(noonValue.supplementsName);
        const newChecked = [...checked];
        let params = { nickname: nickname, supplementsName: noonValue.supplementsName };
        if (currentIndex === -1) {
            newChecked.push(noonValue.supplementsName);
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

        setChecked(newChecked);

    };
    //저녁
    const handleTogglePm = (pmValue) => () => {
        const currentIndex = checked.indexOf(pmValue);
        const newChecked = [...checked];
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

        setChecked(newChecked);
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
    console.log(checked);
    useEffect(() => {
        pill();
        checked.push("비타민C", "루테인");
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

                                                    edge="end"
                                                    onChange={handleToggleAm(amValue)}
                                                    checked={checked.indexOf(amValue.supplementsName) !== -1}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    defaultChecked
                                                    sx={{
                                                        color: 'orange',
                                                        '&.Mui-checked': {
                                                            color: 'orange',
                                                        },
                                                    }}
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

                                                    edge="end"
                                                    onChange={handleToggleNoon(noonValue)}
                                                    checked={checked.indexOf(noonValue.supplementsName) !== -1}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    defaultChecked
                                                    sx={{
                                                        color: 'orange',
                                                        '&.Mui-checked': {
                                                            color: 'orange',
                                                        },
                                                    }}
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

                                                            edge="end"
                                                            onChange={handleTogglePm(pmValue)}
                                                            checked={checked.indexOf(pmValue) !== -1}
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                            defaultChecked
                                                            sx={{
                                                                color: 'orange',
                                                                '&.Mui-checked': {
                                                                    color: 'orange',
                                                                },
                                                            }}

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