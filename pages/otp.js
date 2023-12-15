// otp.js

import { useForm } from 'react-hook-form';
import { Button, TextField, Typography } from '@mui/material';
import Link from 'next/link';

const OTP = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Handle OTP verification logic here
    console.log('Entered OTP:', data.otp);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4">Enter OTP</Typography>
      <form style={{ marginTop: '20px' }} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('otp', { required: 'OTP is required' })}
          type="text"
          label="OTP"
          variant="outlined"
        />
        <Typography color="error" variant="span">{errors?.otp && errors.otp.message}</Typography>
        <Button style={{ marginTop: '20px' }} type="submit" variant="contained">
          Verify OTP
        </Button>
      </form>
      <Typography variant="body2" style={{ marginTop: '20px' }}>
        Back to <Link href="/register">Sign Up</Link>
      </Typography>
    </div>
  );
};

export default OTP;
