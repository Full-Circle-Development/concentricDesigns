const fs = require("fs");
const faker = require("faker");
let record = 3521635;
let product_id = 1000012;

var bigSet = [];

let streamy = fs.createWriteStream("./bigDataQ.csv");
let csv =
  "id, product_id, body, date_written, asker_name, asker_email, reported, helpful\n";
streamy.write(csv);
for (var i = record; i <= 10000000; i++, product_id++) {
  product_id;
  let dataRow =
    i +
    "," +
    product_id +
    "," +
    `"${faker.lorem.sentence()}", "${faker.date
      .between("2018-01-01", "2020-04-05")
      .toJSON()
      .slice(
        0,
        10
      )}", "${faker.name.firstName()} ${faker.name.lastName()}", "${faker.internet.email()}", ${faker.random.number(
      1
    )}, ${faker.random.number(15)}\n`;
  streamy.write(dataRow);
  // csv += dataRow;
}
// bigSet.push(csv);
streamy.end();
// fs.writeFile(__dirname + "/bigDataSet.csv", bigSet, function () {
//   console.log("bigDataSet generated successfully!");
// });
