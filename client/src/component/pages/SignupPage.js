import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField  from '@mui/material/TextField';
import {useMutation} from '@apollo/client';
import {ADD_USER} from '../../utils/mutations'

const SignupPage = ({setCurrentPage}) => {
   const [addUser, { error }] = useMutation(ADD_USER);
   const [formData, setFormData] = useState({username: '', email:'', password: ''});
   // use this function to link the state with the form data.
   const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormData({
        ...formData,
        [name]: value,
      });
    };

   const handleSubmit = async (e) => {
      e.preventDefault();
      // handle error with try/catch method
      try {
         const {data} = await addUser({variables: {...formData}})
         console.log(data);
      } catch(e) {
         console.error(e);
      }
   };

   const handlePage = () => {
      setCurrentPage('Login');
   }

   return(
      <section className='signup-container'>
         <div className='signup-placeholder'>Text</div>
         <form className='signup-form' onSubmit={handleSubmit}>
            <h1 className='signup-title'>Let's Start!</h1>
            <div>
               <TextField sx={{width:'35ch'}} name='username' label='username' variant='outlined' onChange={handleChange} value={formData.username} required />
            </div>
            <div>
               <TextField sx={{width:'35ch'}} name='password' label='password' variant='outlined' onChange={handleChange} value={formData.password} required />
            </div>
            <div>
               <TextField sx={{width:'35ch'}} name='email' label='email' variant='outlined' onChange={handleChange}  value={formData.email} required/>
            </div>
            <div>
               <Button type='submit' variant="contained" color="primary">
                  Signup
               </Button>
            </div>
            <div>
               Already a member? <Button onClick={handlePage} variant='oulined'>Login</Button> Instead
            </div>
         </form>
      </section>
      
   )
}

export default SignupPage;