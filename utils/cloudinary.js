const cloud = require('../config/config.js').clodinary
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: cloud.cloudName,
  api_key: cloud.apiKey,
  api_secret: cloud.apiSecret
})

module.exports = cloudinary
