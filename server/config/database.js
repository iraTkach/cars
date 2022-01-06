const mongoose = require('mongoose');

const connectDB = () => {
    const uri = `mongodb+srv://iratkach:1234@cluster0.c9qav.mongodb.net/Cars?retryWrites=true&w=majority`
   // `mongodb+srv://kernelios:1234@kernelios.ppe7p.mongodb.net/kernelios?retryWrites=true&w=majority`
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    mongoose.connect(uri, options);
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

module.exports = connectDB;