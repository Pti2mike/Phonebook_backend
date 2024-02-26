const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://Mike-admin:${password}@cluster0.1whhc.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String || null,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4] || null,
});

// Add a person
if (process.argv.length > 3 && process.argv.length <= 5) {
  person.save().then((result) => {
    const { name, number } = result;
    if (name && number) {
      console.log(`added ${name} number ${number} to phonebook`);
    } else if (name) {
      console.log(`added ${name} without number to phonebook`);
    }
    mongoose.connection.close();
  });
}

// Find all people
if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("phonebook: ");
    result.map((person) => {
      const { name, number } = person;
      console.log(name, number);
    });
    mongoose.connection.close();
  });
}
