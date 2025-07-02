const Login = require('../models/loginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado');
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
    
    try {
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
            req.flash('success', 'Você logou no sistema!');
            req.session.user = connect.user;
            req.session.save(function() {
                return res.redirect('/login/index');
            });
        }
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}