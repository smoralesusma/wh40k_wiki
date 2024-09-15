"use client";

import { FC, useState } from "react";
import {
  TextField,
  Grid2 as Grid,
  Box,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Mutation from "../mutation";
import { GraphQLQueryNames } from "@/lib/graphql/graphql-query-enums";
import { USER_LOGIN, USER_SIGNUP } from "@/lib/graphql/mutations";

const AuthForm: FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formDataLogin, setFormDataLogin] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [formDataSignup, setFormDataSignup] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isLogin
      ? setFormDataLogin({
          ...formDataLogin,
          [e.target.name]: e.target.value,
        })
      : setFormDataSignup({
          ...formDataSignup,
          [e.target.name]: e.target.value,
        });
  };

  const handleSubmit = async (data: any) => {
    const isError = isLogin
      ? !formDataLogin.emailOrUsername || !formDataLogin.password
      : !formDataSignup.email ||
        !formDataSignup.username ||
        !formDataSignup.password;

    setError("");
    if (isError) {
      setError("Please complete all fields.");
      return;
    }

    try {
      router.push("/");
    } catch (err) {
      setError("Error during authentication");
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography component="h1" variant="h5" textAlign="center">
        {isLogin ? "Sign In" : "Sign Up"}
      </Typography>
      <Box sx={{ mt: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <Mutation
          handleData={handleSubmit}
          handleError={() => {}}
          queryName={
            isLogin
              ? GraphQLQueryNames.USER_LOGIN
              : GraphQLQueryNames.USER_SIGNUP
          }
          queryString={isLogin ? USER_LOGIN : USER_SIGNUP}
          variables={isLogin ? formDataLogin : formDataSignup}
          buttonText={isLogin ? "Log In" : "Sign Up"}
        >
          {!isLogin && (
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={formDataSignup.username}
              onChange={handleInputChange}
              autoFocus
            />
          )}
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={
              isLogin ? formDataLogin.emailOrUsername : formDataSignup.email
            }
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={isLogin ? formDataLogin.password : formDataSignup.password}
            onChange={handleInputChange}
          />
        </Mutation>
        <Grid container justifyContent="flex-end">
          <Grid>
            <Link
              variant="body2"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormDataLogin({ emailOrUsername: "", password: "" });
                setFormDataSignup({ username: "", email: "", password: "" });
              }}
              sx={{ cursor: "pointer" }}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AuthForm;
