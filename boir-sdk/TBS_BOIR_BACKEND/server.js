const express = require("express"); /*Using Express JS*/
const dotenv = require("dotenv"); /*Using dotenv to load environment variables*/
const cors = require("cors"); /*To avoid cors while connecting with frontend*/

dotenv.config(); //To access the env file in node js backend

const port = process.env.PORT; /*Initializing Port */
const app = express();

app.use(cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use("/Boir", require("./routes/business/businessRoute")); // Business Routes

// Listen to the connection on the specified port
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
