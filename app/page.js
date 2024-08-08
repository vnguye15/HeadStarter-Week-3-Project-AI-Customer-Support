'use client';

import React, { useState } from 'react';
import { Box, Stack, TextField, IconButton, Avatar, Typography, AppBar, Toolbar, Button, Menu, MenuItem } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/navigation'; // Use `next/navigation` instead of `next/router`

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! It's Stocks for Noobs assistant. How can I help today?"
    },
    {
      role: "user",
      content: "Hello"
    }
  ]);
  const [input, setInput] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter(); // To handle navigation

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }]);
      setInput('');
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

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
    >
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Customer Support Chat
          </Typography>
          <Button color="inherit" onClick={handleHomeClick}>
            Home
          </Button>
          <IconButton color="inherit" onClick={handleAvatarClick}>
            <Avatar />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
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
                  AI
                </Avatar>
              )}
              <Box
                bgcolor={message.role === 'assistant' ? 'primary.main' : 'secondary.main'}
                color="white"
                borderRadius={16}
                p={2}
                maxWidth="70%"
              >
                <Typography variant="body1">
                  {message.content}
                </Typography>
              </Box>
              {message.role === 'user' && (
                <Avatar sx={{ bgcolor: 'gray', ml: 2 }}>
                  U
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
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
  );
}
