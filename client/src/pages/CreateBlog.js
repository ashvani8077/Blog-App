import React, { useState } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const id=localStorage.getItem('userId');
    const navigate=useNavigate();
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: ''
    })

    const handleChange=(e)=>{
        setInputs(prevState=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))

    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const {data}=await axios.post('/api/v1/blog/create-blog',{
                title:inputs.title,
                description:inputs.description,
                image:inputs.image,
                user:id
            });
            if(data?.success){
                alert("Blog Created successfully")
                navigate('/my-blogs');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
                    width={'50%'}
                    border={3}
                    borderRadius={10}
                    padding={3}
                    margin='auto'
                    boxShadow={'10px 10px 20px #ccc'}
                    display='flex'
                    flexDirection={'column'}
                    marginTop='30px'
                    >
                    <Typography
                        variant='h2'
                        textAlign={'center'}
                        fontWeight={'bold'}
                        padding={3}
                        color='gray'>
                        Create a Post
                    </Typography>
                    <InputLabel sx={{marginBottom:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Title</InputLabel>
                    <TextField name='title' margin='normal' variant='outlined' value={inputs.title} onChange={handleChange} required></TextField>

                    <InputLabel sx={{marginBottom:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Description</InputLabel>
                    <TextField name='description' margin='normal' variant='outlined' value={inputs.description} onChange={handleChange} required></TextField>

                    <InputLabel sx={{marginBottom:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Image URL</InputLabel>
                    <TextField name='image' margin='normal' variant='outlined' value={inputs.image} onChange={handleChange} required></TextField>

                    <Button type='submit' color='primary' variant='contained'>SUBMIT</Button>
                </Box>
            </form>
        </>
    )
}

export default CreateBlog
