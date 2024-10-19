const express = require('express');
const app = express();
const eWasteData = require('./data');

// Endpoint home sederhana
app.get('/', (req, res) => {
  res.json({ message: "API Pengelolaan Sampah Elektronik" });
});

// Endpoint untuk menampilkan semua jenis dan kategori sampah elektronik
app.get('/ewaste', (req, res) => {
  const { jenis, kategori } = req.query;
  let filteredData = eWasteData;

  // Jika ada query jenis, filter data berdasarkan jenis
  if (jenis) {
    filteredData = filteredData.filter(item => 
      item.jenis.toLowerCase().includes(jenis.toLowerCase())
    );
  }

  // Jika ada query kategori, filter data berdasarkan kategori
  if (kategori) {
    filteredData = filteredData.filter(item => 
      item.kategori.toLowerCase().includes(kategori.toLowerCase())
    );
  }

  res.json(filteredData);
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
