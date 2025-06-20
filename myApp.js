import "dotenv/config";

import mongoose from "mongoose";

const { Schema } = mongoose;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("Error de conexión:", err);
  });

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Franco",
    age: 18,
    favoriteFoods: ["Asado", "Hamburguesa", "Pizza"],
  });

  console.log(person);

  person.save((err, data) => {
    if (err) {
      console.log(err);
      return done(err);
    } else {
      console.log(data);
      done(null, data);
    }
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  console.log(arrayOfPeople);

  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.log(err);
      return done(err);
    } else {
      console.log(data);
      done(null, data);
    }
  });
};

const findPeopleByName = (personName, done) => {
  const matchPeople = Person.find({ name: personName }, (err, data) => {
    if (err) {
      console.log(err);
      return done(err);
    } else {
      console.log(data);
      done(null, data);
    }
  });

  console.log(matchPeople);
};

const findOneByFood = (food, done) => {
  const matchPerson = Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      console.log(err);
      return done(err);
    } else {
      console.log(data);
      done(null, data);
    }
  });

  console.log(matchPerson);
};

const findPersonById = (personId, done) => {
  const person = Person.findById(personId, (err, data) => {
    if (err) {
      console.log(err);
      return done(err);
    } else {
      console.log(data);
      done(null, data);
    }
  });

  console.log(person);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) {
      console.log(err);
      return done(err);
    }

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) {
        console.log(err);
        return done(err);
      } else {
        console.log(updatedPerson);
        done(null, updatedPerson);
      }
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedPerson) => {
    if (err) {
      console.log(err);
      return done(err);
    } else {
      console.log(updatedPerson);
      done(null, updatedPerson);
    }
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, (err, data) => {
    if (err) {
      console.log(err);
      return done(err);
    } else {
      console.log(data);
      done(null, data);
    }
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.deleteMany({ name: nameToRemove }, (err, data) => {
    if (err) {
      console.log(err);
      return done(err);
    } else {
      console.log(data);
      done(null, data);
    }
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  const query = Person.find({ favoriteFoods: foodToSearch });
  const sortedPeople = query.sort({ name: 1 }).limit(2);
  const selectedPeople = sortedPeople.select("-age");

  selectedPeople.exec((err, data) => {
    if (err) {
      console.log(err);
      return done(err);
    } else {
      console.log(data);
      done(null, data);
    }
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

export { Person as PersonModel };
export { createAndSavePerson };
export { findPeopleByName };
export { findOneByFood };
export { findPersonById };
export { findEditThenSave };
export { findAndUpdate };
export { createManyPeople };
export { removeById };
export { removeManyPeople };
export { queryChain };
