const mongoose = require('mongoose');

// Connect to MongoDB (replace <your_connection_string> with your actual MongoDB connection string)
const uri = "mongodb+srv://huah21vn:<hr7896DWnuQhKEL>@web-grupp-2-db.bhfmb.mongodb.net/?retryWrites=true&w=majority&appName=Web-grupp-2-db";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// Define the schema
const peopleSchema = new mongoose.Schema({
  role: String,
  email: String,
  password: String,
  name: String,
  sirname: String,
  age: String,
  id: String,
  buildingAccess: {
    A: Boolean,
    B: Boolean,
  },
  accessLayers: {
    A: String,
    B: String,
  },
});

// Create the model
const Person = mongoose.model('Person', peopleSchema);

// Define the data you want to add
const newPersonData = new mongoose.Schema({
  role: "patient",
  email: "gggamerftw@yahoo.se",
  password: "DDW7Qnz3nKBseM7",
  name: "Ash",
  sirname: "Benlolo",
  age: "24",
  id: "huah21vn",
  buildingAccess: {
    A: true,
    B: true,
  },
  accessLayers: {
    A: "5",
    B: "5",
  },
});

// Function to add the data to the People collection
export const addPerson = async () => {
  try {
    const newPerson = new Person(newPersonData);
    await newPerson.save();  // Save the new document to the collection
    console.log('Person added successfully');
  } catch (error) {
    console.error('Error adding person:', error);
  } finally {
    mongoose.connection.close();  // Close the connection once done
  }
};

// Call the function to add the person
addPerson();