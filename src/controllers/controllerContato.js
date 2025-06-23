// controllerContato        

exports.controllerContato = (req, res) => {
    res.send('Entre em contato conosco... <br> <form method="post" action="/contato"> Seu número: <input type="number" name="numero"> <Button>Enviar</Button>');
}

exports.tratandoContato = (req, res) => {
    res.send(`Seu número é ${req.body.numero}`);
}