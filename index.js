const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;

const userRoute =require('./routes/user');
const { default: mongoose } = require("mongoose");

// connnecting MONGODB.....
mongoose.connect("mongodb+srv://devdeeep0110:5qE5bqp5N0slWF6g@cluster0.vcbupac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> console.log("MongoDb connected"))
.catch(err => console.log(err))


// set of view engine middleware....
app.set("view engine" ,"ejs");
app.set("views" ,path.resolve("./views"));

// middlewares...
app.use(express.urlencoded({extended:false}));


// routes...........
// 1.
app.get('/' ,(req,res) =>{
    res.render("home");
})
// 2.
app.use("/user" ,userRoute);

app.listen(PORT , () =>{
    console.log(`Server started in PORT:${PORT}`);
})
