require('dotenv').config();
const express = require('express')
const cors = require('cors');
const connection = require('./db')
const cookieParser = require('cookie-parser')
const adminController = require('./Controller/adminController')
const adminauthRoutes = require('./Routes/adminRoutes');
const AdduserRoutes = require('./Routes/addduserRoutes')
const UserloginRoutes = require('./Routes/UserRoutes')
// const ProductRoutes = require('./Routes/ProductRoutes')




const app = express();
app.use(cookieParser())
const PORT = process.env.PORT || 8080;


// mongo connection

connection();

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors())
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

adminController.adminpost();

// admin ruter
app.use('/api', adminauthRoutes)
app.use('/api', AdduserRoutes)
app.use('/api', UserloginRoutes)
// app.use('/api', ProductRoutes)

app.use('/Public/images', express.static('Public/images'));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });

  app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));