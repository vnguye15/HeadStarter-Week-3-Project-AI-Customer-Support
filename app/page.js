import React from 'react';
import { Box, Typography, AppBar, Toolbar } from '@mui/material';
import "./globals.css"
import Link from 'next/link';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export default function HomePage() {
  return (
    <Box
      width={'100vw'}
      height={'100vh'}
      display={'flex'}
      flexDirection={'column'}
    >
      <AppBar position="static">
        <Toolbar sx={{backgroundColor: 'black'}}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'100%'}
            padding={'0px 60px'}
          >
            <Typography variant="h6">
              Stocks For Noobs
            </Typography>
            <Box
              display={'flex'}
              gap={2}
            >
              <SignUpButton>
                <button className='auth-button'>Sign Up</button>
              </SignUpButton>
              <SignInButton forceRedirectUrl='/chat'>
                <button className='auth-button'>Sign In</button>
              </SignInButton>
            </Box>
          </Box>
          
          
        </Toolbar>
      </AppBar>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        flex={1}
      >
        <Typography variant='h1' textAlign={'center'} width={'60%'}>
          Welcome to Stocks For Noobs Chatbot Assistant. 
        </Typography>
        <Typography variant='h5' textAlign={'center'}>
          Please sign in to proceed.
        </Typography>
      </Box>
    </Box>
  )
}