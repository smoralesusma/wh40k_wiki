import { FC, useState } from "react";
import {
  TextField,
  Grid2 as Grid,
  Box,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import { useRouter } from "next/router";
import Mutation from "../mutation";
import { GraphQLQueryNames } from "@/lib/graphql/graphql-query-enums";
import { USER_LOGIN, USER_SIGNIN } from "@/lib/graphql/mutations";

const AuthForm: FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (
      !formData.email ||
      !formData.password ||
      (!isLogin && !formData.username)
    ) {
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
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <Mutation
          handleData={handleSubmit}
          handleError={() => {}}
          queryName={
            isLogin
              ? GraphQLQueryNames.USER_LOGIN
              : GraphQLQueryNames.USER_SIGNUP
          }
          queryString={isLogin ? USER_LOGIN : USER_SIGNIN}
          variables={formData}
        >
          {!isLogin && (
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={formData.username}
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
            value={formData.email}
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
            value={formData.password}
            onChange={handleInputChange}
          />
        </Mutation>
        <Grid container justifyContent="flex-end">
          <Grid>
            <Link
              variant="body2"
              onClick={() => setIsLogin(!isLogin)}
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
