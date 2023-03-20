const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../schema/schema')
const HOST_CLIENT = process.env.HOST_CLIENT
    ? process.env.HOST_CLIENT
    : 'http://localhost:3000';


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passField: 'password',
    passReqToCallback: true,
    origin: HOST_CLIENT,
    credentials: true
}, async (req, username, password, done) => {

    try {
        const user = await User.findOne({ username: username })
        if (user) {
            //arreglar esta linea
            return done(null, false, req.flash('signupMessage', 'Usuario no encontrado'))
        } else {
            const NewUser = new User();
            NewUser.username = username;
            NewUser.pass = NewUser.encryptPassword(password);
            await NewUser.save();
            return done(null, NewUser);
        }
    } catch (error) {
        return done(error);
    }
}))


passport.use('local-signin', new LocalStrategy({
    usernameField: 'username',
    passField: 'password',
    origin: HOST_CLIENT,
    passReqToCallback: true,
    credentials: true
},
    async (req, username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, req.flash('signinMessage', 'Usuario no encontrado'));
            } else {
                const isMatch = await user.comparePassword(password);
                if (isMatch) {
                    return done(null, user, req.flash('signinMessage', 'Usuario encontrado' + req.user?.username));
                } else {
                    return done(null, false, req.flash('signinMessage', 'Contraseña incorrecta'));
                }
            }
        } catch (err) {
            return done(err);
        }
    }));