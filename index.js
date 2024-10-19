const express = require('express');
const app = express();
const eWasteData = require('./data');

// Endpoint home sederhana
app.get('/', (req, res) => {
  res.json({ message: "API Pengelolaan Sampah Elektronik" });
});

// Endpoint untuk menampilkan jenis dan kategori sampah elektronik yang dapat dijemput
app.get('/ewaste', (req, res) => {
  res.json(eWasteData);
});

// Endpoint untuk menampilkan detail dan gambar berdasarkan ID jenis sampah elektronik
app.get('/ewaste/:id', (req, res) => {
  const eWasteItem = eWasteData.find(item => item.id == req.params.id);
  
  if (eWasteItem) {
    res.json(eWasteItem);
  } else {
    res.status(404).json({ message: "Data tidak ditemukan" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
