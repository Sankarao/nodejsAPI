const express = require("express");
const mongoose = require("mongoose");
const BrandName = require("./model");
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb+srv://ravisuresh:ravi123@cluster0.clb8crl.mongodb.net/", {
    useNewUrlParser: true,
    //useFindAndModify: false,
    useUnifiedTopology: true,
    connectTimeoutMS: 10000,

  })
  .then(() => console.log("db connected...."))
  .catch((err) => console.log(err));

app.post("/addbrands", async (req, res) => {
  const { brandname } = req.body;
  try {
    const newData = new BrandName({ brandname });
    await newData.save();
    return res.json(newData);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/getallbrands',async(req,res) =>{
    try{
        const allData = await BrandName.find();
        return res.json(allData);
    }
    catch(err){
        console.log(err.message);
    }
});
app.get('/getallbrands/:id',async(req,res) => {
    try{
        const Data = await BrandName.findById(req.params.id)
        return res.json(Data);
    }
    catch(err){
        console.log(err.message);
    }
})
app.delete('/deletebrand/:id',async (req,res) =>{
    try{
     const Data =  await BrandName.findByIdAndDelete(req.params.id);
        return res.json(Data)
    }
    catch(err){
        console.log(err.message)
    }
});
app.post('/updatebrand',async (req,res) =>{
    try{
        const UpdateData = await BrandName.findOneAndUpdate(req.body);
        return res.json(UpdateData)
    }
    catch(err){
        console.log(err.message)
    }
})

app.listen(3000, () => console.log("server running"));
