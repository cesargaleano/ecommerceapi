const dotenv = require('dotenv')
const express = require('express');
//const fileUpload = require('express-fileupload');
const server = express();
//const CORS = require('cors');
//const mongoose = require('mongoose');
//const authRoute = require('./routes/auth');
//const userRoute = require('./routes/user');
//const cartRoute = require('./routes/cart');
//const productRoute = require('./routes/product');
//const orderRoute = require('./routes/order');
//const fileRoute = require('./routes/file');

const PORT = process.env.PORT || 8080;

dotenv.config();
//mongoose.connect(process.env.MONGO_URL)
//        .then(()=>console.log('Bd is connected'))
//        .catch((e)=>console.log(e)); 

/*server.use(CORS({
        origin: '*',
        credentials: true,
    }));
*/

server.use(express.json());
//server.use(fileUpload());
//server.use('/api/auth',authRoute);
//server.use('/api/user',userRoute);
//server.use('/api/cart',cartRoute);
//server.use('/api/product',productRoute);
//server.use('/api/order',orderRoute);
//server.use('/api/store/file',fileRoute);

server.get('/', (req,res)=>{
        res.send("App is Running");
        });
server.listen(PORT, ()=>console.log('Server Running'));


