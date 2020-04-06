const fs = require("fs");
const faker = require("faker");

// let randomName = faker.name.findName();
// include node fs module
let data = [
  // [
  //   "id",
  //   "product_id",
  //   "body",
  //   "date_written",
  //   "asker_name",
  //   "asker_email",
  //   "reported",
  //   "helpful",
  // ],
  [
    3521635,
    1000012,
    faker.lorem.sentence(),
    faker.date.recent(),
    faker.name.firstName() + faker.name.lastName(),
    faker.internet.email(),
    0,
    1,
  ],
];
// writeFile function with filename, content and callback function

const download_csv = () => {
  var csv =
    "id, product_id, body, date_written, asker_name, asker_email, reported, helpful,\n";
  data.forEach(function (row) {
    csv += row.join(",");
    csv += "\n";
  });
  // console.log(data);
  console.log(csv);
  fs.writeFile("/qa.csv", csv, function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
};

download_csv();
// () => console.log(data));
//   console.log(csv);
//};

// fs.writeFile("newfile.csv", data, function (err) {
//   if (err) throw err;
//   console.log("File is created successfully.");
// });

// {
//   /* <script> */
// }
// let data = ["test"];
// let data = [
//   [
//     "id",
//     "product_id",
//     "body",
//     "date_written",
//     "asker_name",
//     "asker_email",
//     "reported",
//     "helpful",
//   ],
//   [
//     3521635,
//     1000012,
//     faker.lorem.sentence(),
//     faker.date.recent(),
//     faker.name.firstName() + faker.name.lastName(),
//     faker.internet.email(),
//     0,
//     1,
//     // faker.fake(
//     //   "{{lorem.sentence}}, {{date.recent}}, {{name.firstName name.lastName}}, {{internet.email}}, 0, 1"
//     // ),
//   ],
// ];
// var data = [
//   ["Foo", "programmer"],
//   ["Bar", "bus driver"],
//   ["Moo", "Reindeer Hunter"],
// ];

// const download_csv = () => {
//   var csv = "Name,Title\n";
//   data.forEach(function (row) {
//     csv += row.join(",");
//     csv += "\n";
//   });
// fs.writeFile("/test.csv", data, () => console.log(data));
//   console.log(csv);
// };

// download_csv();
// </script>
// console.log(randomName);
