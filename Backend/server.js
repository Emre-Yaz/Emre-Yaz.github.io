const express = require('express');
const app = express();
const port = 3000; 

app.use(express.static('FWB'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); 
});

app.get('/fwb_resume', (req, res) => {
    res.sendFile(__dirname + '/FWB/fwb_resume.html'); 
});

app.get('/fwb_contact', (req, res) => {
    res.sendFile(__dirname + '/FWB/fwb_contact.html'); 
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/FWB/login.html'); 
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/FWB/register.html'); 
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

