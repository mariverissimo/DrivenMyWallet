import express from 'express';
const app = express();
config();
const PORT = process.env.PORT;

app.use(express.json());


app.listen(PORT, () => {
    console.log("Listening on 5000")
  })