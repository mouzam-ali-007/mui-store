import React, { useState } from "react";
import { signUpWithEmail, loginWithEmail, loginWithPhone } from "./../services/data.service";
import { Box, TextField, Button, Typography, ToggleButton, ToggleButtonGroup, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [authType, setAuthType] = useState("email");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleAuth = async () => {
        let data;
        try {
            if (isLogin) {
                if (authType === "email") {
                    data = await loginWithEmail(email, password);

                    if (data.user) {
                        setMessage("Logged in successfully!");
                        navigate("/");
                    } else {
                        setMessage("Some thing went wrong!");
                    }

                } else {
                    await loginWithPhone(phone);
                    setMessage("OTP sent to your phone!");
                }
            } else {
                if (authType === "email") {
                    data = await signUpWithEmail(email, password);
                    if (data.user) {
                        setMessage("Sign up successful! Check your email to confirm.");
                        navigate("/");
                    } else {
                        setMessage("Some thing went wrong!");
                    }

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


        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg,rgb(164, 189, 240),rgb(220, 198, 242))",
                px: 2,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    p: { xs: 3, sm: 4 },
                    borderRadius: 3,
                    textAlign: "center",
                }}
            >
                {/* Title */}
                <Typography variant="h4" fontWeight="bold" mb={1}>
                    {isLogin ? "Welcome Back" : "Create Account"}
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={3}>
                    {isLogin
                        ? "Login to continue"
                        : "Sign up to get started"}
                </Typography>

                {/* Email Inputs */}
                <TextField
                    label="Email"
                    fullWidth
                    size="medium"
                    sx={{ mb: 2 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    sx={{ mb: 3 }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Button */}
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleAuth}
                    sx={{
                        py: 1.3,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "16px",
                        background: "linear-gradient(135deg, #667eea,rgb(219, 205, 233))",
                    }}
                >
                    {isLogin ? "Login" : "Sign Up"}
                </Button>

                {/* Switch */}
                <Typography
                    mt={3}
                    sx={{ cursor: "pointer", fontSize: "14px" }}
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin
                        ? "Don't have an account? Sign Up"
                        : "Already have an account? Login"}
                </Typography>

                {/* Message */}
                {message && (
                    <Typography mt={2} color="error">
                        {message}
                    </Typography>
                )}
            </Paper>
        </Box>
    );
};

export default AuthPage;