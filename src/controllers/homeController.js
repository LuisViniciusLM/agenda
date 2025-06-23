// Controle HOME
exports.paginaInicial = (req, res) => {
    console.log();
    console.log('Respondendo ao cliente');

    // enviar
    res.render('index', {
      // Injetando dados na views
      titulo: 'Titulo injetado na página',
      numeros: [0,1,2,3,4,5,6,7,8,9]
    });
}

exports.tratandoInicial = (req, res) => {
    res.send(req.body); 
    console.log(`Vi que você postou: ${req.body.cliente}`);
}



