import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import styles from '../styles/style.module.css';
import Link from "next/link"
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ConnectWallet } from "@thirdweb-dev/react";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.psw
        }),
      });
      if (response.ok) {
        const { authToken } = await response.json();
        // Save authToken in localStorage or state for future authenticated requests
        console.log('Logged In successfully! Token:', authToken);
        router.push('/index'); // Redirect to index page
        setIsLoggedIn(true);
      } else {
        console.error('Login failed:', response.statusText);
        router.push('/login');
      }
    }
    catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className={styles.Auth}>
      <Image src="/images/th.jpg" alt="login image" width={300} height={200} />

      <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4">Login</Typography>
        <p>Welcome back! Please login to your account.</p>
        <ConnectWallet />

        <div className={styles.formgroup}>
          <TextField
            {...register("email", { required: "Email Field Required" })}
            type="email"
            label="Email"
            color="success"
            variant="outlined"
          />
          <Typography className={styles.error} variant="span">
            {errors?.email && errors.email.message}
          </Typography>

          <TextField
            {...register("psw", { required: "Password Field Required" })}
            type="password"
            label="Password"
            color="success"
            variant="outlined"
          />
          <Typography className={styles.error} variant="span">
            {errors?.psw && errors.psw.message}
          </Typography>


          <FormControlLabel
            control={<Checkbox color="success" />}
            label="Remember Me"
          />

          <Button type="submit" variant="contained">
            Login
          </Button>

          <Typography className={styles.body2} variant="body2">
            Already a user?<Link href="/register">register</Link>
          </Typography>

        </div>
      </form>
    </div>
  );
};

export default Login;
