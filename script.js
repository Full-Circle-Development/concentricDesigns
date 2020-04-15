import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

// GET ROUTES

export let errorRate = new Rate("errors");

export default function () {
  var url = "http://localhost:3000/qa/1";
  var params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  check(http.get(url, params), {
    "status is 200": (r) => r.status == 200,
  }) || errorRate.add(1);
  sleep(0.001); // changed from 1 since a µs is .001 ms
}

// POST ROUTES

// export let errorRate = new Rate("errors");

// export default function () {
//   var url = "http://localhost:3000/qa/100";
//   var params = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   var data = JSON.stringify({
//     body: `If I had two magic boxes I would give one to Gabe and the other to user+${__VU}`,
//     name: `user+${__VU}`,
//     email: `user+${__VU}@mail.com`,
//   });
//   check(http.post(url, data, params), {
//     "status is 201": (r) => r.status == 201,
//   }) || errorRate.add(1);

//   sleep(1);
// }
