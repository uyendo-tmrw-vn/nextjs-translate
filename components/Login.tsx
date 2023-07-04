import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface LoginProps {
  onSubmit: (username: string, password: string) => Promise<string | undefined>;
}

const Login = ({ onSubmit }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleUsername = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUsername(e.target.value);
  };
  const handlePassword = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    setLoading(true);
    const error = await onSubmit(username, password);
    setError(error);
    setLoading(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper
        sx={{
          textAlign: "center",
          padding: 2,
        }}
        elevation={4}
      >
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <TextField
            value={username}
            required
            fullWidth
            autoFocus
            placeholder="Username"
            onChange={handleUsername}
            error={error !== undefined}
            disabled={isLoading}
          />
          <TextField
            value={password}
            required
            fullWidth
            autoFocus
            placeholder="Password"
            onChange={handlePassword}
            error={error !== undefined}
            disabled={isLoading}
            type="password"
          />
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
