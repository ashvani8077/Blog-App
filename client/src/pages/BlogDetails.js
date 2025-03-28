import React ,{useState,useEffect}from 'react'
import axios from 'axios'
import{ useParams,useNavigate } from 'react-router-dom'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';

const BlogDetails = () => {
    const [blog,setBlog]=useState();
    const [inputs, setInputs] = useState({})
    const id=useParams().id;
    const navigate=useNavigate();
    //get blog details
    const getBlogDetail=async()=>{
        try {
            const {data}=await axios.get(`/api/v1/blog/get-blog/${id}`);
            if(data?.success){
                setBlog(data?.blog);
                setInputs({
                    title:data?.blog.title,
                    description:data?.blog.description,
                    image:data?.blog.image,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getBlogDetail();

    },[id]);
    

    const handleChange=(e)=>{
        setInputs(prevState=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))

    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const {data}=await axios.put(`/api/v1/blog/update-blog`,{
                title:inputs.title,
                description:inputs.description,
                image:inputs.image,
                user:id
            });
            if(data?.success){
                alert("Blog updated successfully")
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
                        Update you Blog
                    </Typography>
                    <InputLabel sx={{marginBottom:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Title</InputLabel>
                    <TextField name='title' margin='normal' variant='outlined' value={inputs.title} onChange={handleChange} required></TextField>

                    <InputLabel sx={{marginBottom:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Description</InputLabel>
                    <TextField name='description' margin='normal' variant='outlined' value={inputs.description} onChange={handleChange} required></TextField>

                    <InputLabel sx={{marginBottom:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Image URL</InputLabel>
                    <TextField name='image' margin='normal' variant='outlined' value={inputs.image} onChange={handleChange} required></TextField>

                    <Button type='submit' color='warning' variant='contained'>UPDATE</Button>
                </Box>
            </form>
    </>
  )
}

export default BlogDetails
