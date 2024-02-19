const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Home
app.get("/", (request, response) => {
  response.send("<h1>Hello Phonebook backend !</h1>");
});

// See all persons available
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// See information about
app.get("/info", (request, response) => {
  let personsCount = persons.length;
  let dateNow = new Date();
  response.send(`
  <p>Phonebook has info for ${personsCount} people</p>
  <p>${dateNow}</p>
  `);
});

// Get one person
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => {
    return person.id === id;
  });

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// Delete a person
app.delete("/api/persons/:id", (request, response) => {
  const idToDelete = Number(request.params.id);

  persons = persons.filter((person) => person.id !== idToDelete);

  response.status(204).end();
});

const generateRandomId = () => {
  let randomId = Math.floor(Math.random() * 10000) + 1;
  return randomId;
};

// Add a person
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  const nameExists = persons.some((person) => person.name === body.name);

  if (nameExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateRandomId(),
  };

  persons = persons.concat(person);

  response.status(201).json(person);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
