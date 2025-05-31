import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className='mx-auto flex justify-center items-center'>
      <h1>Page not found - <Link to="/" className='text-blue-600 underline'>Go to home</Link></h1>
    </div>
    </>
  )
}

export default ErrorPage
