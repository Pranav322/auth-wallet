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

  const onSubmit = (data) => {
    // Handle registration logic here

    // Simulate successful registration
    console.log('Registration data:', data);
    setIsRegistered(true);

    // Redirect to the OTP page
    router.push('/otp');
  };

  return (
    <div className={styles.Auth}>
      <Image src="/images/th.jpg" width={300} height={200} />
      <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
        <ConnectWallet
          dropdownPosition={{
            side: 'bottom',
            align: 'center',
          }}
        />
        <Typography variant="h4">Sign Up</Typography>
        <p>Explore new Features !</p>

        <div className={styles.formgroup}>
          <TextField
            {...register('name', {
              required: 'Name Field Required',
              maxLength: { value: 15, message: 'Maximun 15 Characters' },
            })}
            type="text"
            label="Name"
            color="success"
            variant="outlined"
          />
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
