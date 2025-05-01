import express from 'express';
import routes from '../router/router.js';
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(routes)

app.listen(PORT, () => {
    console.log("Listening on 5000")
  })