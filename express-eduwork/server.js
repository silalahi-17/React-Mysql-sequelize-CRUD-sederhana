require("dotenv").config();
const express = require('express');
const router = require('./routes/index') //dikomentar sementara agar product router use sequilize tidak berjalan
const app = express();
const port = process.env.port || 5000;
const cors = require('cors');
const path = require('path');

app.use(cors())
app.use(express.json())//untuk req use json
app.use(express.urlencoded({extends: true}))//pengganti body parser
app.use("/api/products", router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});