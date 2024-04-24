const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app=express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker2k24',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(()=>{
    console.log("Successfully connected to MongoDB");
})
.catch((error)=>{
    console.log("Couldn't connect to DB",error);
})

const ExpenseModel = mongoose.model('expenses',{
    title: String,
    description: String,
    amount: Number,
    type: Number,
    date: String
});

app.get("/expenses", async(req,res)=>{
    const data = await ExpenseModel.find();
    return res.send(data);
})

app.get("/expenses/:id", async (req, res) => {
    console.log(req.params.id);
    const data = await ExpenseModel.findById(req.params.id);
    return res.send(data);
})
// app.get("/expenses/:id", async(req,res)=>{
//     // const payload = req.body;

//     try{
//         const item = await ExpenseModel.findById(req.params.id);
//         return res.send(item);
//     }
//     catch(error){
//         throw new Error(error);
//     }
// })

app.post("/expenses", async(req,res)=>{
    const payload = req.body;
    console.log(payload);

    const expense=  new ExpenseModel(payload);
    const item = await expense.save();
    console.log("POST operation, ITEM:", item);
    res.send({message: "SUCCESS"})
})

app.put("/expenses/:id", async(req,res)=>{
    const payload = req.body;
    const id=req.params.id;
    console.log("PUT API: ", payload, id);

    const item = await ExpenseModel.findByIdAndUpdate(id, payload);
    console.log(item);
    res.send({message:"SUCCESS"});
})

app.delete("/expenses/:id", async(req,res)=>{
    const id = req.params.id;
    console.log(`Data to be deleted: ${id}`);
    const item = await ExpenseModel.findByIdAndDelete(id);
    console.log(item);
    res.send({message: "SUCCESS"});
})

const PORT = 8000;
app.listen(PORT, ()=>{
    console.log(`Connected to server on PORT: ${PORT}`);
})