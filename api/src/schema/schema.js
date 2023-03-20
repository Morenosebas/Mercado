const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

// Este Es la definicon del esquema de documento del user en general
// queda pendiente dividr en vario documentos, y agregar la propiedad de imagen a cada producto

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    pass: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true });

UserSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password.toString(), bcrypt.genSaltSync(10))
}
UserSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password.toString(), this.pass)
}


const User = mongoose.model("User", UserSchema);


//este esquema es para definir la estructura de la Tienda la cual esta referida al esquema de usuario
//a este esquema falta definirle la categoria
const ShopSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50,

    },
    userBoss: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            min: 0
        },
        price: {
            type: Number,
            min: 0
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: null });

const Shop = mongoose.model("Shop", ShopSchema);

//a este esquema falta definirle la categoria
    
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: null });

const Product = mongoose.model("Product", ProductSchema);

const UserBuySchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    purchases: {
        type: Number,
        default: 0
    },
    favoriteProducts: [{
        type: mongoose.Schema.Types.String,
        ref: 'Product'
    }],
    listProducts: [{
        type: mongoose.Schema.Types.String,
        ref: 'Product'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: null });

const UserBuyer = mongoose.model("UserBuyer", UserBuySchema);

module.exports = {
    User,
    Product,
    Shop,
    UserBuyer,
}


// UserData.methods.encryptPassword = (password) => {
//     return bcrypt.hashSync(password.toString(), bcrypt.genSaltSync(10));
// };

// UserData.methods.comparePassword = function(password) {
//     return bcrypt.compareSync(password.toString(), this.pass);
// };

// const UserSchema = mongoose.model('User', UserBuy);
// const StoreSchema = mongoose.model('UserStore', UserShop);