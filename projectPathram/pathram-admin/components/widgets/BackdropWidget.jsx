import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function BackdropWidget({open,onClickFunction=()=>{}}) {
  return (
    <Backdrop
      sx={{ color: "#F1F0FF", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={onClickFunction}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default BackdropWidget;
