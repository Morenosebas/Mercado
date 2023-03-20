const router = require('express').Router();
const passport = require('passport');
const { getUser } = require('../controllers/userController.js');
const { getProducts,getOneProduct } = require('../controllers/productsController');

//rutas de productos
router.route('/products')
    .get(getProducts)
router.get('/products/:storeid/:id', getOneProduct);







//rutas de sesion

router.route('/profile')
.get( isAuthenticated, getUser)

router.route('/signup')
    .post(passport.authenticate('local-signup', {
        successRedirect: '/api/profile',
        failureRedirect: '/api/signup',
        failureFlash: true
    }))


router.route('/signin')
    .post(passport.authenticate('local-signin', {
        successRedirect: '/api/profile',
        failureRedirect: '/api/signin',
        failureFlash: true
    }))



router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/api/profile")
        console.log("logout");
    });
});

//no me esta guardando el usuario ni autenticandeo
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("No autenticado")
    res.json({
        isAuthenticated: false,
    })
}



module.exports = router;