const express = require('express');
const path = require('path');
const app = express();
const port = 3000; 

// Serve static files from the 'docs' directory
app.use(express.static(path.join(__dirname, '..', 'docs')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'docs', 'index.html')); 
});

app.get('/resume', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'docs', 'resume.html')); 
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'docs', 'contact.html')); 
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'docs', 'login.html')); 
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'docs', 'register.html')); 
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
