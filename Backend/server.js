const express = require('express');
const path = require('path');
const app = express();
const port = 3000; 

app.use(express.static('docs'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index.html')); 
});

app.get('/fwb_resume', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'fwb_resume.html')); 
});

app.get('/fwb_contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'fwb_contact.html')); 
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'login.html')); 
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'register.html')); 
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
