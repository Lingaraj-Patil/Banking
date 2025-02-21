const express = require("express");
const app = express();
const rootRouter = require("./routes/index");
const cors = require("cors");


app.use(cors());
app.use(express.json());
app.use("/api/v1/",rootRouter);

const PORT = 5000;
app.listen(5000,()=>{
    console.log(`app is listening to ${PORT}`)
})
