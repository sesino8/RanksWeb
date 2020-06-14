const mongoose = require("mongoose");

const MONGOURI = "mmongodb+srv://sesino8:Paiporta123@cluster0-uef9i.mongodb.net/ranksweb?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;