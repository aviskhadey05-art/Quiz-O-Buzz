require('dotenv').config({path: './server/.env'});
const mongoose = require('mongoose');
const { getTeacherQuizzes } = require('./server/controllers/quiz.controller.js');
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected");
    getTeacherQuizzes({query: {teacherId: '69b1ff6d4dc4efb44dcc8117'}}, {
        json: console.log,
        status: (c) => ({json: (msg) => console.log(c, msg)})
    });
});
