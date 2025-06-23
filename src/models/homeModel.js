const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema( {
    titulo: { type: String, required: true },
    descricao: String
});

//                                nome    esquema
const HomeModel = mongoose.model('home', HomeSchema);

// module.exports = HomeModel;

class Home {

}

module.exports = Home;