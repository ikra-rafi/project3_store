// Defining methods for the LoginController
module.exports = {

    getenvVars: function(req, res) {
        var envVars = {
            cloudName: process.env.CLOUD_NAME,
            uploadPreset: process.env.UPLOAD_PRESET
        };
        res.json(envVars);
    },

  };