import express from "express";
import path from "path";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.static("../client/build"));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});