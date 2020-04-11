const fs = require("fs");
const faker = require("faker");
const { performance } = require("perf_hooks");

const start = performance.now();
let record = 3521635;
let product_id = 1000012;

let streamy = fs.createWriteStream("./bigDataQ.csv");
let csv =
  "id, product_id, body, date_written, asker_name, asker_email, reported, helpful\n";
streamy.write(csv);
for (var i = record; i <= 10000000; i++) {
  let dataRow =
    i +
    "," +
    product_id +
    "," +
    `"${faker.lorem.sentence()}","${faker.date
      .between("2018-01-01", "2020-04-05")
      .toJSON()
      .slice(
        0,
        10
      )}","${faker.internet.userName()}","${faker.internet.email()}",${faker.random.number(
      1
    )},${faker.random.number(15)}\n`;
  let nextProduct = faker.random.number({ min: 1, max: 4 });
  if (nextProduct === 4) {
    ++product_id;
  }

  streamy.write(dataRow);
}

streamy.end();
const end = performance.now();
console.log("Total time in seconds: ", end - start);
console.log("Total time in minutes: ", (end - start) / 60000);

// what about Math.ceil(Math.Random()*maxid)) for route randomness with K6???
