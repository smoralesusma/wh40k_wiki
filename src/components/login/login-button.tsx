/* import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import axios from 'axios';

const LoginButton = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail('');
    setPassword('');
    setIsSignUp(false);
    setError(null);
  };

  const handleAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      if (isSignUp) {
        // Call the API for signup
        await fetch('/api/auth/signup', { email, password });
        // Optionally, auto-login after signup
        await signIn('credentials', {
          redirect: false,
          email,
          password,
        });
      } else {
        // Sign in the user
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (!result?.ok) {
          throw new Error(result?.error || 'Login failed');
        }
      }
      handleClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {isSignUp ? 'Sign Up' : 'Login'}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isSignUp ? 'Sign Up' : 'Login'}</DialogTitle>
        <DialogContent>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAuth}
            color="primary"
            disabled={loading}
          >
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Login'}
          </Button>
        </DialogActions>
        <DialogActions>
          <Button
            onClick={() => setIsSignUp(!isSignUp)}
            color="secondary"
          >
            {isSignUp ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginButton;
 */