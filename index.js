"use strict";

const express = require("express");
const app = express();

app.use(express.static("dist"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
  if (err) return console.error(err);

  console.log(`This is port ${PORT}, and I'm listening`);
});
