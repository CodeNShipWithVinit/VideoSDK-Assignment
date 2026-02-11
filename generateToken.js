import jwt from "jsonwebtoken";

const API_KEY = "66a2cc62-cea0-49d9-9e19-b6dfa1affb57";
const SECRET = "85a60ad618e60949025e161d8b606b39cd1922a0a54c9f3184d652eece2a8fd9";

const payload = {
  apikey: API_KEY,
  permissions: ["allow_join"]
};

const token = jwt.sign(payload, SECRET, {
  algorithm: "HS256",
  expiresIn: "24h"
});

console.log(token);
