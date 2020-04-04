const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");

let url = "mongodb://localhost:27017/";

csvtojson()
  .fromFile("questions.csv") // /home/sean/hack/bld08/sdc/concentricDesigns/questions.csv
  .then((csvData) => {
    console.log(csvData);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db("qa") // Correct?
          .collection("qaSchema") // Correct?
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });
