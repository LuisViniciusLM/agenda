const Login = require('../models/loginModel');

exports.index = (req, res) => {
    res.render('login');
};

exports.register = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('success', login.success);
        req.session.save(function() {
            return res.redirect('/login/index');
        });
        return;
    } catch(e) {
        console.log(e);
        return res.render('404');
    }

};

exports.connection = async (req, res) => {
    const connect = new Login(req.body);
    const searching = await connect.login();

    if(connect.errors.length > 0) {
        req.flash('errors', connect.errors);
        req.session.save(function () {
                return res.redirect('/login/index');
            });
            return;
    }

    if(searching) {
        return res.redirect('/');
    }
}