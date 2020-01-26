const express = require('express');
const app = express();
const show = require('./src/assets/show.json');
const apiRoutes = express.Router();
app.use('/api',apiRoutes);
module.exports = {
   devServer:{      
        before: function(app, server) {
            app.get('/api/show', (req, res) => {
                res.json({
                    data: show
                })
            })
        },
        open: true,
   },
}