// Register.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import styles from '../styles/style.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { ConnectWallet } from '@thirdweb-dev/react';

const Register = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isRegistered, setIsRegistered] = useState(false);

  const onSubmit = async (data) => {
    // Handle registration logic here
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.psw,
          meterId: data.meterId
        }),
      });
      if (response.ok) {
        const { authToken } = await response.json();
        // Save authToken in localStorage or state for future authenticated requests
        console.log('Registration successful! Token:', authToken);
        // Redirect to the OTP page
        // router.push('/otp');
        router.push('/index'); // Redirect to index page
        setIsRegistered(true);
      } else {
        console.error('Login failed:', response.statusText);
        router.push('/register');
      }
    }
    catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className={styles.Auth}>
      <Image src="/images/th.jpg" width={300} height={200} />
      <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>

        <Typography variant="h4">Sign Up</Typography>
        <p>Explore new Features !</p>


        <ConnectWallet
          dropdownPosition={{
            side: 'bottom',
            align: 'center',
          }}
        />

        <div className={styles.formgroup}>
          <Typography color="error" variant="span">{errors?.name && errors.name.message}</Typography>

          <TextField
            {...register('email', { required: 'Email Field Required' })}
            type="email"
            label="Email"
            color="success"
            variant="outlined"
          />
          <Typography color="error" variant="span">{errors?.email && errors.email.message}</Typography>

          <TextField
            {...register('psw', {
              required: 'Password Field Required',
              maxLength: { value: 15, message: 'Maximun 15 Characters' },
              minLength: { value: 4, message: 'Minimun 4 Characters' },
            })}
            type="password"
            label="Password"
            color="success"
            variant="outlined"
          />
          <Typography color="error" variant="span">{errors?.psw && errors.psw.message}</Typography>

          <TextField
            {...register("meterId", { required: "SmartMeter I'd is required" })}
            type="text"
            label="SmartMeter I'd"
            color="success"
            variant="outlined"
          />
          <Typography className={styles.error} variant="span">
            {errors?.meterId && errors.meterId.message}
          </Typography>

          <FormControlLabel control={<Checkbox color="success" />} label="Remember Me" />

          <Button type="submit" variant="contained">
            Create Account
          </Button>

          <Typography variant="body2">
            Already a user? <Link href="/login">Sign In</Link>
          </Typography>
        </div>
      </form>
    </div>
  );
};

export default Register;
