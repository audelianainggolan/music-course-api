const mongoose = require('mongoose');
const dns = require('dns');

// Set DNS server ke Cloudflare untuk memecahkan masalah koneksi ISP
dns.setServers(['1.1.1.1', '1.0.0.1']);

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err.message);
  });


module.exports = mongoose;