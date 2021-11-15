import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const Header = ({ darkMode, handleThemeChange } : Props) => {
    return (
        <AppBar position="static" sx={{mb: 8}}>
            <Toolbar>
                <Typography variant="h6">RE-STORE</Typography>
                <Switch checked={darkMode} onChange={handleThemeChange} />
            </Toolbar>
        </AppBar>
    )
};

export default Header;