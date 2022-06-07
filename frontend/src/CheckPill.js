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
    const [isChecked, setIsChecked] = React.useState([1]);
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
        const currentIndex = checked.indexOf(pmValue.supplementsName);
        const newChecked = [...checked];
        let params = { nickname: nickname, supplementsName: pmValue.supplementsName };
        if (currentIndex === -1) {
            newChecked.push(pmValue.supplementsName);
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
    function isCheck() {
        let body = { nickname: nickname };
        axios.get("/api/supplements/eatenlist", { params: body })
            .then(function (res) {
                console.log("체크드성공");

                for (var i = 0; i < res.data.length; i++) {
                    if (checked[i + 1] != res.data[i].supplementsName) { checked.push(res.data[i].supplementsName); }
                    console.log(res.data[i]);
                }
                console.log(res.data[0].supplementsName);


            })
            .catch(function (err) {
                console.log('실패');

            });
    }
    useEffect(() => {
        pill();
        isCheck();


    }, []);
    console.log(checked);
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
                                    amValue.slot == "MORNING" ? <div>
                                        <ListItem
                                            key={amValue}
                                            secondaryAction={
                                                <Checkbox

                                                    edge="end"
                                                    onChange={handleToggleAm(amValue)}
                                                    checked={checked.some(v => v == amValue.supplementsName) == true}
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
                                    noonValue.slot == "LUNCH" ? <div>
                                        <ListItem
                                            key={noonValue}
                                            secondaryAction={
                                                <Checkbox

                                                    edge="end"
                                                    onChange={handleToggleNoon(noonValue)}
                                                    checked={checked.some(v => v == noonValue.supplementsName) == true}
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

                                        pmValue.slot == "DINNER" ?
                                            <div>
                                                <ListItem
                                                    key={pmValue}
                                                    secondaryAction={
                                                        <Checkbox

                                                            edge="end"
                                                            onChange={handleTogglePm(pmValue)}
                                                            checked={checked.some(v => v == pmValue.supplementsName) == true}
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