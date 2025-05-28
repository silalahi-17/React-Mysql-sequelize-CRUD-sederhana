require("dotenv").config();
const express = require('express');
const router = require('./routes/index') //dikomentar sementara agar product router use sequilize tidak berjalan
const app = express();
const port = process.env.port || 5000;
const cors = require('cors');
const path = require('path');
const db = require('./models/index');

app.use(cors())
app.use(express.json())//untuk req use json
app.use(express.urlencoded({extends: true}))//pengganti body parser
app.use("/api/products", router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(port, async () => {
  try {
    await db.sequelize.authenticate();  // cek koneksi ke database
    await db.sequelize.sync();          // sinkronisasi tabel dengan model
    console.log('Database connected and synced');
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});