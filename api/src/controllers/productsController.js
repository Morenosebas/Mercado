const { Product } = require('../schema/schema')

const ProductsController = {

};
//esta funcion es para obtener uno de los productos
ProductsController.getOneProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            $or: [{ _id: req.params.id }, { shop: req.params.storeid }]
        });
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};
//esta funcion es para obtener todos los productos de cualquier tienda en el cliente

ProductsController.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        if (products) {
            res.json({
                products
            })
        } else {
            return res.json({ error: "error getting products" })
        }


    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }

}

//ESTA funcion es para crear un product

ProductsController.createProduct = async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            // image: req.body.image,
            shop: req.user.shop, //aqui debe ir la referencia al user shop,
            _id: req.body._id
        });
        const productSaved = await product.save();
        res.json(productSaved);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};


module.exports = ProductsController;