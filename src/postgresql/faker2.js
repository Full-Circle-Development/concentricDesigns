const fs = require("fs");
const faker = require("faker");

var bigSet = [];

let csv = "body, date_written, asker_name, asker_email\n";

for (var i = 20; i >= 18; i--) {
  let dataRow = `${faker.lorem.sentence()}, ${faker.date.recent()}, ${faker.name.firstName()}, ${faker.name.lastName()}, ${faker.internet.email()}\n`;
  csv += dataRow;
}
bigSet.push(csv);

console.log(bigSet);

// download = () => {
//   var csv = "body, date_written, asker_name, asker_email,\n";
//   bigSet.forEach(function (row) {
//     csv += row.join(",");
//     csv += "\n";
//     row += "\n";
//   });
// };

// download();
// bigSet.forEach(function (row) {
//   csv += row.join(",");
//   csv += "\n";
//});

fs.writeFile(__dirname + "/bigDataSet.csv", bigSet, function () {
  console.log("bigDataSet generated successfully!");
});
