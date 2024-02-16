const fs = require('fs');

const cloudinary = require("cloudinary").v2;


require("dotenv").config({ path: "C:/Users/Hp/Desktop/social-network-webaap/.env" });

cloudinary.config({
  cloud_name: 'dehqq4vrf',
  api_key: '995342589518135',
  api_secret: 'm853TLIbxExAQI0PJOQjXvKt1F4',
});

module.exports = cloudinary;