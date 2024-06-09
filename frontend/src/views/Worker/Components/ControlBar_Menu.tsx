import React from "react"

// style
import {Box, Button, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// API

// components

// interface
import {ControlBarMenu_Prop} from "../../../utils/Interface/Worker/Worker"


const ControlBar_Menu = (props: ControlBarMenu_Prop) => {
    const {
        pages,
        currentPage,
        isComputer,
        anchorElNav,
        setAnchorElNav
    } = props
    return (
        <Box sx={{
            flexGrow: 1,
            display: {xs: isComputer ? 'none' : 'flex', md: isComputer ? 'flex' : 'none'}
        }}>
            {isComputer && pages.map((page) => (
                <Button
                    startIcon={page.pageIcon}
                    key={page.pageName}
                    onClick={page.click}
                    sx={{
                        px: 5,
                        marginTop: '24px',
                        height: '40px',
                        backgroundColor: currentPage === page.pageName ? '#e5e5e5' : 'none',
                        borderRadius: '20px 20px 0 0',
                        color: currentPage === page.pageName ? '#14213d' : 'white',
                        fontWeight: 600,
                        '&:hover': {
                            backgroundColor: currentPage === page.pageName ? '#e5e5e5' : 'rgba(229,229,229,0.5)',
                        }
                    }}
                >
                    {page.pageName}
                </Button>
            ))}
            {!isComputer &&
                <>
                    <IconButton
                        size="large"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={(e) => {
                            setAnchorElNav(e.currentTarget);
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        // 菜單錨點元件
                        anchorEl={anchorElNav}
                        // 菜單錨點原點
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        // 設置為 True 表示關閉狀態下也會保留在 DOM 中
                        keepMounted
                        // 猜單變換原點
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={() => {
                            setAnchorElNav(null)
                        }}
                        sx={{
                            display: {xs: 'block', md: 'none'},
                            width: 200
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page.pageName}>
                                {page.pageIcon}
                                <Typography
                                    textAlign="center"
                                    sx={{mx: 2}}
                                    onClick={page.click}
                                >
                                    {page.pageName}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </>

            }
        </Box>
    )
}

export default ControlBar_Menu