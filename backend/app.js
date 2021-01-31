require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const PORT = 3000;
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
 

const staffs = require('./controllers/staffscontroller');
const leaves = require('./controllers/leavecontroller');


staffs(app);
leaves(app);


const server = http.createServer(app);
server.listen(PORT, () => {
    console.log('Server running at '+ PORT);
});