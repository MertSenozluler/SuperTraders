const express = require("express");
const routes  = require("./routes/routes");



const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req,res) => {
    res.send("Welcome to SuperTraders!");
});

app.use("/", routes);



app.listen(port, () => console.log(`app listening on port ${port}`));