//OBS: O express só reconhece um MIDDLEWARE se ele tiver 3 argumentos: req, res, next.

exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVariavelGlobal = 'Variável Globalllll';
    next();
}

exports.outroMiddleware = (req, res, next) => {
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN') {
        res.render('404');
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}