const express = require("express");
const app = express();
const port = 3005;

const cors = require("cors");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// enable cors
app.use(cors());
app.options("*", cors());

app.get("/", (req, res) => {
  const { count } = req.query;

  if (count == 1) {
    sleep(5000).then(() => {
      res.send("Hello World 1!");
    });

    return;
  }

  if (count == 2) {
    sleep(1000).then(() => {
      res.send("Hello World 2!");
    });
    return;
  }

  if (count != 1 || count != 2) {
    res.send("Hello World " + count);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
