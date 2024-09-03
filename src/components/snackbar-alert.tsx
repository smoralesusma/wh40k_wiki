"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Snackbar, Alert, SnackbarOrigin, AlertColor } from "@mui/material";

interface SnackbarAlertProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
  severity?: AlertColor;
  anchorOrigin?: SnackbarOrigin;
  redirectPath?: string;
}

const SnackbarAlert: FC<SnackbarAlertProps> = ({
  open,
  setOpen,
  message,
  severity,
  anchorOrigin = { vertical: "top", horizontal: "center" },
  redirectPath,
}) => {
  const router = useRouter();

  const handleClose = () => {
    if (redirectPath) router.push(redirectPath);
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
