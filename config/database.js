const mongosse = require("mongoose");
mongosse.connect(
  "mongodb://localhost:27017/chromosomeUser",
  /*
  {
    useNewUrlParser: true,
    useUnifiedUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
  },
  */
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected to db succesfuly...");
    }
  }
);
