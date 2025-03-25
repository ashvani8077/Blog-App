import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
  const navigate = useNavigate();
  //state
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  })

  //handle input change
  const handleChange = (e) => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  //on Submit 
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.post('/api/v1/user/register',{username:inputs.name, email:inputs.email, password:inputs.password});
      if(data.success){
        alert('User Register Successfully');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box maxWidth={450}
          display='flex'
          flexDirection={'column'}
          alignItems={'center'}
          margin={'auto'}
          marginTop={5}
          boxShadow='10px 10px 20px #ccc'
          padding={3}
          borderRadius={5}
        >
          <Typography variant='h4'
            padding={3}
            textAlign={'center'}
            sx={{ textTransform: 'uppercase' }}>
            Register
          </Typography>
          <TextField
            placeholder='name'
            name='name'
            value={inputs.name}
            onChange={handleChange}
            margin='normal'
            type='text' />

          <TextField
            placeholder='email'
            name='email'
            value={inputs.email}
            onChange={handleChange}
            margin='normal'
            type='email'
            required />

          <TextField
            placeholder='password'
            name='password'
            margin='normal'
            value={inputs.password}
            onChange={handleChange}
            type='password'
            required />
          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            type='submit'
            variant='contained'
            color='primary'
          >Submit</Button>

          <Button
            onClick={() => {
              navigate('/login');
            }}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >Already registered? Please login</Button>
        </Box>
      </form>
    </>
  )
}

export default Register
