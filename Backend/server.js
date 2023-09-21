const express = require('express');
const app = express();
const port = 3000; 

app.use(express.static('docs'));

app.get('/', (req, res) => {
    res.sendFile('/../docs/index.html'); 
});

app.get('/resume', (req, res) => {
    res.sendFile('/../docs/resume.html'); 
});

app.get('/contact', (req, res) => {
    res.sendFile('/../docs/contact.html'); 
});

app.get('/login', (req, res) => {
    res.sendFile('/../docs/login.html'); 
});

app.get('/register', (req, res) => {
    res.sendFile('/../docs/register.html'); 
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

