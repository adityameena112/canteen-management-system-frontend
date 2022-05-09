import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { Tooltip } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Divider } from '@mui/material';
import { Menu } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const MenuButtonComponent = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        window.open("http://localhost:3000/profile", '_self')
    }

    return (
        <div>

            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                <Avatar sx={{ width: 32, height: 32 }}>{ props.avatarName() }</Avatar>
            </IconButton>
        </Tooltip>

        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                },
                '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
        <MenuItem component={Link} to="/profile" >
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
            <Settings fontSize="small" />
            Settings
        </MenuItem>
        <MenuItem onClick={props.handleLogout}>
            <Logout fontSize="small mr-2" />
            Logout
        </MenuItem>
      </Menu>
            
        </div>
    );
}

export default MenuButtonComponent;