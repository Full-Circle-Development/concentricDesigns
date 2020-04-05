const fs = require("fs");
const faker = require("faker");

let randomName = faker.name.findName();

{
  /* <script> */
}
let data = [
  [
    "id",
    "product_id",
    "body",
    "date_written",
    "asker_name",
    "asker_email",
    "reported",
    "helpful",
  ],
  [
    3521635,
    1000012,
    faker.lorem.sentence(),
    faker.date.recent(),
    faker.name.firstName() + faker.name.lastName(),
    faker.internet.email(),
    0,
    1,
    // faker.fake(
    //   "{{lorem.sentence}}, {{date.recent}}, {{name.firstName name.lastName}}, {{internet.email}}, 0, 1"
    // ),
  ],
];

const download_csv = () => {
  var csv = "Name,Title\n";
  data.forEach(function (row) {
    csv += row.join(",");
    csv += "\n";
  });
  fs.writeFile("/faker.questions.csv", data, () => console.log(data));
  //   console.log(csv);
};

download_csv();
// </script>
// console.log(randomName);
