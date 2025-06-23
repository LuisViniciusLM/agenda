// npm install dotenv
require('dotenv').config(); //  dotenv lê o arquivo .env e carrega todas as variáveis definidas nele para dentro de process.env.

const express = require('express'); // modulo do express que ta no node_modules
const routers = require('./routes'); 
const app = express();

const mongoose = require('mongoose'); // npm install mongoose
const connectionString = process.env.CONNECTIONSTRING; // pegando (lendo) o valor que já está dentro de process.env.CONNECTIONSTRING e salvando na variável connectionString. 
mongoose.connect(connectionString).then(() => { 
    app.emit('pronto'); //Emitindo sinal "pronto";
    console.log('Emiti o sinal PRONTO');
 })
 .catch(e => { console.log(e) }); 

const session = require('express-session'); // sessões
const mongoStore = require('connect-mongo'); // (session); // Sessões salvas no banco de dados MongoDB
const flash = require('connect-flash'); // Armazenar no flash mensagens que vão ser exibidas ao usuário e apagadas após serem exibidas

const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware');

app.use(helmet());
//              url codificada
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// pasta public vai ser estática -> fixa
app.use(express.static(path.resolve(__dirname, 'public')));

// configurações da sessão
const sessionOptions = session({
    secret: 'sdfsdfsdfgsdgdrfghdfg vasvas  qwf qwf qwf a6()',
    store: mongoStore.create({
        mongoUrl: connectionString,  // Use sua string de conexão
        collectionName: 'sessions'   // Nome da coleção (opcional)
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

// Definindo a pasta views dentro de src
app.set('views', path.resolve(__dirname, 'src', 'views'));
//        motor de
//       visualização
app.set('view engine', 'ejs');

app.use(csrf());
// Meus próprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routers);

// Quando conectar na base de dados vai emitir o sinal "pronto" e só depois inicializa o servidor
app.on('pronto', () => {
        // ouvir
    // servidor ta rodando na porta 3000
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000');
    });
})