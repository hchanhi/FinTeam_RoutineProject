import * as React from 'react';
import { useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { Divider, Paper } from '@mui/material';


export default function CheckPill() {
    const [amChecked, setAmChecked] = React.useState([1]);
    const [noonChecked, setNoonChecked] = React.useState([1]);
    const [pmChecked, setPmChecked] = React.useState([1]);
    //아침
    const handleToggleAm = (amValue) => () => {
        const currentIndex = amChecked.indexOf(amValue);
        const newChecked = [...amChecked];

        if (currentIndex === -1) {
            newChecked.push(amValue);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setAmChecked(newChecked);
    };
    //점심
    const handleToggleNoon = (noonValue) => () => {
        const currentIndex = noonChecked.indexOf(noonValue);
        const newChecked = [...noonChecked];

        if (currentIndex === -1) {
            newChecked.push(noonValue);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setNoonChecked(newChecked);
    };
    //저녁
    const handleTogglePm = (pmValue) => () => {
        const currentIndex = pmChecked.indexOf(pmValue);
        const newChecked = [...pmChecked];

        if (currentIndex === -1) {
            newChecked.push(pmValue);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setPmChecked(newChecked);
    };
    let [AmCheck, setAmCheck] = useState(['비타민D', '오메가3', '루테인']);
    let [NoonCheck, setNoonCheck] = useState(['비타민C', '오메가3', '루테인']);
    let [PmCheck, setPmCheck] = useState(['비타민C', '오메가3', '루테인']);
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Paper elevation={6} sx={{ width: '140px', maxWidth: 360, borderRadius: '30px' }}>
                <List dense sx={{ width: '140px', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '30px' }}>
                    <ListItemText
                        sx={{ my: 1, textAlign: 'center' }}
                        primary="아침"
                        primaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: 'medium',
                            letterSpacing: 0,
                        }}
                    />
                    <Divider />
                    {AmCheck.map((amValue) => {
                        const labelId = `checkbox-list-secondary-label-${amValue}`;
                        return (
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

                                    <ListItemText id={labelId} primary={` ${amValue}`} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>

            <Paper elevation={6} sx={{ width: '140px', maxWidth: 360, borderRadius: '30px' }}>
                <List dense sx={{ width: '140px', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '30px' }}>
                    <ListItemText
                        sx={{ my: 1, textAlign: 'center' }}
                        primary="점심"
                        primaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: 'medium',
                            letterSpacing: 0,
                        }}
                    />
                    <Divider />
                    {NoonCheck.map((noonValue) => {
                        const labelId = `checkbox-list-secondary-label-${noonValue}`;
                        return (
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

                                    <ListItemText id={labelId} primary={` ${noonValue}`} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
            <Paper elevation={6} sx={{ width: '140px', maxWidth: 360, borderRadius: '30px' }}>
                <List dense sx={{ width: '140px', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '30px' }}>
                    <ListItemText
                        sx={{ my: 1, textAlign: 'center' }}
                        primary="저녁"
                        primaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: 'medium',
                            letterSpacing: 0,
                        }}
                    />
                    <Divider />
                    {PmCheck.map((pmValue) => {
                        const labelId = `checkbox-list-secondary-label-${pmValue}`;
                        return (
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

                                    <ListItemText id={labelId} primary={` ${pmValue}`} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
        </div>
    );
}