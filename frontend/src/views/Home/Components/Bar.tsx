import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
// style
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
} from '@mui/material'
import CodeIcon from '@mui/icons-material/Code'
import MenuIcon from '@mui/icons-material/Menu'
import {deepOrange} from "@mui/material/colors"
// API
import {API_logout} from "../../../utils/API/API_Core"
// components

// interface
import {Bar_Props, pageAndSetting} from "../../../utils/Interface/Home/Home";

const Bar = (props: Bar_Props) => {
    const {name} = props
    // 手機板選單開關
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const NavLocation = useNavigate()

    const pages: Array<pageAndSetting> = [
        {
            pageName: '作品',
            clicks: (e: React.MouseEvent<HTMLElement> | undefined) => product()

        },
        {
            pageName: '',
            clicks: (e: React.MouseEvent<HTMLElement> | undefined) => {
            }
        }
    ];
    const settings = [
        {
            settingName: '個人資料',
            clicks: (e: React.MouseEvent<HTMLElement> | undefined) => account()
        },
        {
            settingName: '登出',
            clicks: (e: React.MouseEvent<HTMLElement> | undefined) => logout()
        }
    ]

    // 作品
    function product() {
    }

    // 個人資料
    function account() {
    }

    // 登出
    function logout() {
        API_logout().then(response => {
            window.location.href = '/'
        })
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <CodeIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            // 透過 display 選擇甚麼模板下 要出現/隱藏
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        AI Lab
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={(e: React.MouseEvent<HTMLElement>) => {
                                setAnchorElNav(e.currentTarget)
                            }}
                            color="inherit"
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
                                setAnchorElNav(null);
                            }}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.pageName}>
                                    <Typography
                                        textAlign="center"
                                    >{page.pageName}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/*手機板*/}
                    <CodeIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        AI Lab
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page.pageName}
                                onClick={() => {
                                    setAnchorElNav(null);
                                }}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page.pageName}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="設定">
                            <IconButton onClick={(e: React.MouseEvent<HTMLElement>) => {
                                setAnchorElUser(e.currentTarget);
                            }} sx={{p: 0}}>
                                <Avatar sx={{bgcolor: deepOrange[500]}} alt={name} src='' variant="rounded"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            // mt => marginTop
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            // 菜單錨點元件
                            anchorEl={anchorElUser}
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
                            open={Boolean(anchorElUser)}
                            onClose={() => {
                                setAnchorElUser(null);
                            }}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.settingName} onClick={setting.clicks}>
                                    <Typography textAlign="center">{setting.settingName}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Bar