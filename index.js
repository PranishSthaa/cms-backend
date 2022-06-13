const express = require('express');
const app = express();
const db = require('./models/index');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

var corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Custom Middlewares
app.use(cookieParser());

// API Routes
require('./routes/api/user.routes')(app);
require('./routes/api/faculty.routes')(app);
require('./routes/api/department.routes')(app);
require('./routes/api/teacher.routes')(app);
require('./routes/api/student.routes')(app);
require('./routes/api/subject.routes')(app);
require('./routes/api/attendance.routes')(app);
require('./routes/api/fee.routes')(app);
require('./routes/api/timeTable.routes')(app);
require('./routes/api/userManagement.routes')(app);


db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
    // initial();
});

const initial = () => {
    db.Role.create({
        id: 1,
        name: "superAdmin"
    });
    db.Role.create({
        id: 2,
        name: "admin"
    });
    db.Role.create({
        id: 3,
        name: "teacher"
    });
    db.Role.create({
        id: 4,
        name: "accountant"
    });
}

