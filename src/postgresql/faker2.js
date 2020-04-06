const fs = require("fs");
const faker = require("faker");
// 2018-01-04T00:00:00.000Z
let record = 3521635;
let product_id = 1000012;

var bigSet = [];

let csv =
  "id, product_id, body, date_written, asker_name, asker_email, reported, helpful\n";

for (var i = record; i <= 3521645; i++, product_id++) {
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
  csv += dataRow;
}
bigSet.push(csv);

fs.writeFile(__dirname + "/bigDataSet.csv", bigSet, function () {
  console.log("bigDataSet generated successfully!");
});
