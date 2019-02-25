var express = require("express");
var app = express();
const Joi = require("joi");
app.use(express.json());

const courses = [
    { "id": 1, course: "course1" },
    { "id": 2, course: "course2" },
    { "id": 3, course: "course3" },
]

app.get("/", (req, res) => {
    console.log("app get method");
    res.send("Hello world");
});

app.get("/api/courses", (req, res) => {
    console.log("/api/courses");
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const courseWithID = courses.find(c => c.id === parseInt(req.params.id));
    if (!courseWithID) {
        res.status(404).send("course not found");
    } else {
        res.send(courseWithID);
    }

})

app.post("/api/courses", (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()

    };

    const result = Joi.validate(req.body, schema);
    console.log(result);
    const course = {
        id: courses.length + 1,
        name: req.params.name
    }
    courses.push(course);
    res.send(course);
})

const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
    console.log(`App is liting on ${port}`);
});