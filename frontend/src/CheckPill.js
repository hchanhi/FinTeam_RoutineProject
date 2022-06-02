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
    const [checked, setChecked] = React.useState([1]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    let [AmCheck, setAmCheck] = useState(['비타민D', '오메가3', '루테인']);
    return (
        <div>
            <Paper elevation={6} sx={{ width: '200px', maxWidth: 360, borderRadius: '30px' }}>
                <List dense sx={{ width: '200px', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '30px' }}>
                    <ListItemText
                        sx={{ my: 2, marginLeft: '10px' }}
                        primary="아침"
                        primaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: 'medium',
                            letterSpacing: 0,
                        }}
                    />
                    <Divider />
                    {AmCheck.map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                            <ListItem
                                key={value}
                                secondaryAction={
                                    <Checkbox
                                        defaultChecked color="success"
                                        edge="end"
                                        onChange={handleToggle(value)}
                                        checked={checked.indexOf(value) !== -1}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                }
                                disablePadding
                            >
                                <ListItemButton>

                                    <ListItemText id={labelId} primary={` ${value}`} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
        </div>
    );
}