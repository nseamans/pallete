// Load Packages 
const express = require('express');
const cors = require('cors'); 
const path = require('path');
const mongoose = require('mongoose');
const contentLength = require('express-content-length-validator');
const mongoSanitize = require('express-mongo-sanitize');
const app = express();
const helmet = require("helmet");
const hpp = require('hpp');

// Configure app
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(hpp());
app.use(mongoSanitize());
app.use(  contentLength.validateMax({
            max: 9999, 
            status: 400, 
            message: "Your request is to long..."
}));
mongoose.set('useFindAndModify', false);
mongoose
  .connect(
    require('./config/keys').mongoURI,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Back-end intro page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname +'/static_content/introduction.html'));
});

// test if the database is functional
app.get('/test', (req, res) => {
    const timestart = new Date();
    res.json({
      test: 'Palette is functional',
      accesstime: timestart
  });
});

app.use('/users', require('./routes/users.js'));
app.use('/colors', require('./routes/colors.js'));

const port = 5000;
app.listen(process.env.PORT || port, () => `Server running on port ${port}`);