import React, {useState} from 'react'
import{ Box, Button, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import {Link} from 'react-router-dom'
import ListIcon from '@mui/icons-material/List'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined'
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined'
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined'
import "./DrawerNav.css"


function DrawerNav() {

        const menuLinks = [
            {text: 'Adopted Dogs', link: '/adopted-dogs', icon: <PetsOutlinedIcon />},
            {text: 'Applications', link: '/admin-dash', icon: <FeedOutlinedIcon />},
            {text: 'Dashboard', link: '/chart', icon: <SpaceDashboardOutlinedIcon/> },
            {text: 'Add Dog', link: '/add-dog', icon: <AddchartOutlinedIcon /> }
        ]

        const [state, setState] = useState({
            left: false,
        })

        const toggleDrawer = (anchor, open) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
                }
            setState({ ...state, [anchor]: open });
            };

        const list = (anchor) => (
            <Box id='box'
                sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
                role="presentation"
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
            >
                <div id="drawer-header">
                    <Button onClick={toggleDrawer('left', false)}>
                    <ArrowBackIosIcon fontSize="large" />
                    </Button>

                </div>
                
                <List id='list'>
                    {menuLinks.map((item) => (
                        <ListItem className='list-item' key={item.text} disablePadding component={Link} to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        )

        const toggleDrawerWithArrow = () => {
            setState((prevState) => ({ ...prevState, left: !prevState.left }));
        };

    return (

        <>
        <div id="banner" style={{ marginLeft: state.left ? '480px' : '0' }}>
            <Button onClick={toggleDrawerWithArrow}>
                {state.left ? <ArrowBackIosIcon id="list-icon" fontSize="large" /> : <ListIcon id="list-icon" fontSize="large" />}
            </Button>
            <span>Bully Barn Customer Management</span>
        </div>
        <Drawer
            anchor="left"
            open={state.left}
            onClose={toggleDrawerWithArrow}
            PaperProps={{style: {background:'#f2f2f2'}}}
        >
            {list('left')}
        </Drawer>
        </>
    )
}
    



export default DrawerNav