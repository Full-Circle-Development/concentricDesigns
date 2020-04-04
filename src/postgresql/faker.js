const fs = require("fs");
const faker = require("faker");

let randomName = faker.name.findName();

{
  /* <script> */
}
let data = [
  ["Foo", "programmer"],
  ["Bar", "bus driver"],
  ["Moo", "Reindeer Hunter"],
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
