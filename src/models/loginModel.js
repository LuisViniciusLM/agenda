const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema( {
    email: { type: String, required: true },
    senha: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.success = [];
        this.user = null;
    }

    async register() {
        this.valida();
        const salt = bcryptjs.genSaltSync();
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);

        if(this.errors.length > 0) return;

        await this.userExist();
        if(this.errors.length > 0) return;

        
        this.user = await LoginModel.create(this.body);
    }

    async userExist() {
        const user = await LoginModel.findOne({ email: this.body.email });
        if(user) {
            this.errors.push('Usuário já existe.');
        }
    }

    valida() {
        this.cleanUp();
        // E-mail precisa ser válido
        if(!validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido');
        }

        // Senha precisa ter entre 3 e 50 caracteres
        if(this.body.senha.length < 3 || this.body.senha.length > 50) {
            this.errors.push('Senha precisa ter entre 3 e 50 caracteres');
        }

        if(validator.isEmail(this.body.email) && this.body.senha.length >= 3 && this.body.senha.length <= 50) {
            this.success.push('Você foi cadastrado com sucesso.');
        }
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        // Objeto sem passar o csrf
        this.body = {
            email: this.body.email,
            senha: this.body.senha
        };
    }

    async login() {
        const correctConnection = await this.checkingLogin();

        if(correctConnection) return correctConnection;
    }

    async checkingLogin() {
        // Buscando usuário pelo e-mail no banco
        const user = await LoginModel.findOne({ email: this.body.email });
        let valid = false

        if(!user) {
            this.errors.push('Usuário não encontrado.');
        }

        if(this.errors.length > 0) return;
       
        if(user) {
            const passwordIsValid = await bcryptjs.compare(this.body.senha, user.senha);
            if(!passwordIsValid) {
                this.errors.push('Senha incorreta.');
                this.user = null;
                return;
            }
            
            if(this.errors.length > 0) return;

            if(passwordIsValid){
                this.user = user;
                valid = true;
            }
        }

        if(valid) return valid;
    }
}

module.exports = Login;