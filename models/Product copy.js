const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true
        },
        description:{
            type: String,
            required: true,
            
        },
         images:{
            type: Array,
            required: true,
         },
        categories:{
            type: Array,
       },
        price:{
            type: String,
            required: true
        },
        currency:{
            type:String,
            required: true

        },
        isDigital:{
            type: Boolean,
            required:true
        }
       
    },

    {timestamps: true}

 )

 module.exports = mongoose.model("Product", productSchema);