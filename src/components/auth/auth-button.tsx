"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC, useState } from "react";
import AuthForm from "./auth-form";

const AuthButton: FC = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button variant="outlined" color="secondary" onClick={handleClose}>
        SignIn/Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <AuthForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthButton;
