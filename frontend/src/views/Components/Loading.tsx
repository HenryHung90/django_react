import { Backdrop, CircularProgress } from "@mui/material";

interface loadingProps{
    Loading:boolean
}
const Loading = (props: loadingProps) => {
    const {Loading} = props
    return (
        <Backdrop sx={{ color: "#fff", zIndex: "10000" }} open={Loading}>
            <CircularProgress color="inherit" size={100} />
        </Backdrop>
    );
};

export default Loading;
