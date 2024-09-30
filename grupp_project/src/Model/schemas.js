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
  