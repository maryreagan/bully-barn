import React from 'react'
import{ Box, Drawer, Button, List, Divider, ListItem, ListItemButton, ListItemIcon } from '@mui/material'




function DrawerNav() {

    const [state, setState] = React.useState({
        left: false,
        });

        const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
        };

        const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem key={text} disablePadding>
                <ListItemButton>
               
                </ListItemButton>
                </ListItem>
            ))}
            </List>
            <Divider />
        
        </Box>
        );
        


    return (
        <div>
        {['left',].map((anchor) => (
        <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            >
            {list(anchor)}
            </Drawer>
        </React.Fragment>
        ))}
    </div>
    );

}

export default DrawerNav