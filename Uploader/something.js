const cloudinary = require('cloudinary')

cloudinary.config(
  {
   cloud_name: 'df1zhfcdh',
   api_key: '979811581419673',
   api_secret: 'CWs_S9BIcsES8gmZINRnDVESXdM',
  }
)

module.exports = {cloudinary}