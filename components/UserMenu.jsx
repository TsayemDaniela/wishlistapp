import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { UserRole } from '../models/UserRole';

const settings = [{ name: 'Dashboard', route: '/admin/dashboard' }, { name: 'Logout', route: '/api/logout' }];

function UserMenu({ user }) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const renderMenuButton = (setting) => {
        const menuItem = (
            <MenuItem key={setting.name}>
                <Link href={setting.route} passHref>
                    <Typography textAlign="center">{setting.name}</Typography>
                </Link>
            </MenuItem>
        );
        if (setting.name === 'Dashboard') {
            if (user.role === UserRole.ADMIN) {
                return menuItem;
            } else {
                return <></>;
            }
        } else {
            return menuItem;
        }
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map(setting => renderMenuButton(setting))}
            </Menu>
        </Box>
    );
}
export default UserMenu;