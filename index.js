require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

// Create new Morgan token for req.body
morgan.token("req-body", (request) => JSON.stringify(request.body));

const app = express();

// Use Morgan with personalized format including body of the request
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);

app.use(cors());
app.use(express.json());

// Home
app.get("/", (request, response) => {
  response.send("<h1>Hello Phonebook backend !</h1>");
});

// See all persons available
app.get("/api/persons", (request, response) => {
  Person.find().then((persons) => {
    response.json(persons);
  });
});

// See information about
app.get("/api/persons/info", (request, response) => {
  Person.find().then((persons) => {
    let personsCount = persons.length;
    let dateNow = new Date();
    response.send(`
    <p>Phonebook has info for ${personsCount} people</p>
    <p>${dateNow}</p>
    `);
  });
});

// Get one person
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  Person.findById(id).then((person) => {
    if (person) {
      response.status(200).json(person);
    } else {
      response.status(404).end();
    }
  });
});

// Delete a person
app.delete("/api/persons/:id", (request, response) => {
  const idToDelete = request.params.id;

  Person.findByIdAndDelete(idToDelete).then((deletedPerson) => {
    if (!deletedPerson) {
      return response.status(404).json({ error: "Person not found!" });
    }
    console.log(deletedPerson);
    return response.status(204).end();
  });
});

// Add a person
app.post("/api/persons", async (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  const nameExists = await Person.find({ name: body.name });

  if (nameExists.length > 0) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number || null,
  });

  person.save().then((savedPerson) => {
    response.status(201).json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
