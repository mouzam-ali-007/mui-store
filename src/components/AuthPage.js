import React, { useState } from "react";
import { signUpWithEmail, loginWithEmail, loginWithPhone } from "./../services/data.service";
import { Box, TextField, Button, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [authType, setAuthType] = useState("email");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleAuth = async () => {
        try {
            if (isLogin) {
                if (authType === "email") {
                    await loginWithEmail(email, password);
                    setMessage("Logged in successfully!");
                } else {
                    await loginWithPhone(phone);
                    setMessage("OTP sent to your phone!");
                }
            } else {
                if (authType === "email") {
                    await signUpWithEmail(email, password);
                    setMessage("Sign up successful! Check your email to confirm.");
                } else {
                    await loginWithPhone(phone);
                    setMessage("OTP sent for sign up!");
                }
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: "50px auto", textAlign: "center", padding: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" mb={2}>{isLogin ? "Login" : "Sign Up"}</Typography>

            <ToggleButtonGroup
                value={authType}
                exclusive
                onChange={(e, val) => val && setAuthType(val)}
                sx={{ mb: 2 }}
            >
                <ToggleButton value="email">Email</ToggleButton>
                <ToggleButton value="phone">Phone</ToggleButton>
            </ToggleButtonGroup>

            {authType === "email" ? (
                <>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </>
            ) : (
                <TextField
                    label="Phone (+1234567890)"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            )}

            <Button variant="contained" fullWidth onClick={handleAuth} sx={{ mb: 2 }}>
                {isLogin ? "Login" : "Sign Up"}
            </Button>

            <Typography
                sx={{ cursor: "pointer", color: "blue" }}
                onClick={() => setIsLogin(!isLogin)}
            >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </Typography>

            {message && <Typography mt={2}>{message}</Typography>}
        </Box>
    );
};

export default AuthPage;