const express = require('express');
const app = express();
const port = 3000; 

app.use(express.static('FWB'));

app.get('/', (req, res) => {
    res.sendFile('/Users/ibrahimemreyaz/Desktop/Emre/Emre-Yaz.github.io/docs/index.html'); 
});

app.get('/fwb_resume', (req, res) => {
    res.sendFile('/Users/ibrahimemreyaz/Desktop/Emre/Emre-Yaz.github.io/docs/fwb_resume.html'); 
});

app.get('/fwb_contact', (req, res) => {
    res.sendFile('/Users/ibrahimemreyaz/Desktop/Emre/Emre-Yaz.github.io/docs/fwb_contact.html'); 
});

app.get('/login', (req, res) => {
    res.sendFile('/Users/ibrahimemreyaz/Desktop/Emre/Emre-Yaz.github.io/docs/login.html'); 
});

app.get('/register', (req, res) => {
    res.sendFile('/Users/ibrahimemreyaz/Desktop/Emre/Emre-Yaz.github.io/docs/register.html'); 
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

