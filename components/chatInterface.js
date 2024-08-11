'use client';

import React, { useState } from 'react';
import { Box, Stack, TextField, IconButton, Avatar, Typography, AppBar, Toolbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/navigation'; // Use `next/navigation` instead of `next/router`
import "../app/globals.css"
import {
  SignedOut,
  UserButton,
  RedirectToSignIn,
} from "@clerk/nextjs";
import { SmartToy } from '@mui/icons-material';

// comment to test commit #3 (viet)
export default function ChatInterface(userImgUrl) {

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! It's your Stocks for Noobs assistant. How can I help today?"
    },
  ]);
  const [message, setMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter(); // To handle navigation


  const sendMessage = async () => {
    setMessage('')
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message},
      { role: 'assistant', content: ''},
    ])
    const response = await fetch('../api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, {role: 'user', content: message}]),
    }).then( async (res) => {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      let result = ''
      return reader.read().then(function processText({done, value}) {
        if (done) {
          return result
        }
        const text = decoder.decode(value || new Int8Array(), {stream:true})
        setMessages((messages) => {
          let lastMsg = messages[messages.length - 1]
          let otherMsgs = messages.slice(0, messages.length - 1)
          return [
            ...otherMsgs,
            {
              ...lastMsg,
              content: lastMsg.content + text
            },
          ]
        })
        return reader.read().then(processText)
      })
    })
  }

  const handleSend = async () => {
    if (message.trim()) {
      sendMessage()
    }
  };

  const handleHomeClick = () => {
    router.push('/'); // Redirect to the home page
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    // Handle logout logic here
    console.log('Logout clicked');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // Start of HTML (Editing ChatInterface)
  return (
    <>
    <SignedOut>
      <RedirectToSignIn signInFallbackRedirectUrl='/chat'/>
    </SignedOut>
    <Box
      className="background"
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
    >
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Stocks for Noobs AI
          </Typography>
          <UserButton/>
        </Toolbar>
      </AppBar>

      {/* Chat Messages */}
      <Box
        flexGrow={1}
        overflow="auto"
        p={2}
        bgcolor="#f5f5f5"
      >
        <Stack spacing={2}>
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
            >
              {message.role === 'assistant' && (
                <Avatar sx={{ bgcolor: 'black', mr: 2 }}>
                  <SmartToy/>
                </Avatar>
              )}
              <Box
                bgcolor={message.role === 'assistant' ? 'primary.main' : 'secondary.main'}
                color="white"
                borderRadius={8}
                p={2}
                maxWidth="70%"
              >
                <Typography variant="body1">
                  {message.content}
                </Typography>
              </Box>
              {message.role === 'user' && (
                <Avatar sx={{ bgcolor: 'gray', ml: 2 }}>
                  <img className='user-pic' src={userImgUrl.userImgUrl} alt='user profile picture'></img>
                </Avatar>
              )}
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Input Field */}
      <Box
        display="flex"
        p={2}
        bgcolor="background.paper"
        boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
      >
        <TextField
          label="Send a message"
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          sx={{ ml: 2 }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
    </>
  );
}
