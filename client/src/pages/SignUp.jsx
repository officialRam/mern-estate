import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [formData, setfromData]=useState({});
  const [loading, setLoading]=useState(false);
  const [error, setError]=useState(null);
  const navigate=useNavigate();
  function handleChange(e){
    setfromData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    setLoading(true);
    try{
      const res=await fetch('/api/auth/signup', {
        method: 'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(formData),
      })    
      const data=await res.json();
      if(data.success===false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in')
    }catch(error){
      setLoading(false);
      setError(error.message);
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={handleChange} type="text" placeholder='username' className='border p-3 rounded-lg' id='username'/>
        <input onChange={handleChange} type="text" placeholder='email' className='border p-3 rounded-lg' id='email'/>
        <input onChange={handleChange} type="password" placeholder='password' className='border p-3 rounded-lg' id='password'/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading?'Loading....':'Sign up'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
        <span className='text-blue-700'>Sign in</span>
        </Link>        
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignUp