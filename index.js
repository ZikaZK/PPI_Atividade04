import express, { response } from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
const host = "localhost";
const porta = 3000;
const app = express();

var listaProdutos = [];

app.listen(porta, host, () => {
    console.log(`Aplicação rodando em http://${host}:${porta}`)
});

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: "segredodasessao",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 15
    }
}));


app.get("/", (req, res) => {
    let resposta = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Atividade 04</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        </head>
        <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">MENU</a>
            </div>
        </nav>
        <div>
    `;
        if(req.session?.dadosLogin?.logado){
            resposta += `<h1 class="text-center border m-3 p-3 bg-light">Bem-vindo(a), ${req.session?.dadosLogin?.usuario}!</h1>`;
        } else {
            resposta += `<h1 class="text-center border m-3 p-3 bg-light">Olá, você não está logado, entre na sua conta ou crie uma abaixo</h1>`;
        }
    resposta += `
        </div>
        <div class="text-center row">
            <div class="card" style="width: 18rem; margin: 0 auto;">
                <div class="card-body">
                    <h5 class="card-title">Produtos</h5>
                    <p class="card-text">Gerencie todos os seus produtos aqui</p>
                    <a href="/cdstrProduto" class="card-link">Cadastrar</a>
                    <a href="/chcrProduto" class="card-link">Checar</a>
                </div>
            </div>
            <div class="card" style="width: 18rem; margin: 0 auto;">
                <div class="card-body">
                    <h5 class="card-title">Conta</h5>
                    <p class="card-text">Entre ou crie uma conta aqui</p>
                    <a href="/signin" class="card-link">Sign In</a>
                    <a href="/login" class="card-link">Log In</a>
                    <form method="POST" action="/logout">
                    <button onclick="alerta()" type="submit" style="border: none; outline: none; background: none; padding: 0; margin: 0;"><a href="" style="pointer-events: none;">Log Out</a></button>
                    </form>
                </div>
            </div>
        </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <script>
        function alerta(){
            alert("Logout efetuado com sucesso!");
        }
        </script>
        </html>
    `;

    res.send(resposta);
});



//PRODUTOS



app.get("/cdstrProduto", verificaLog, (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Atividade 04</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        </head>
        <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">MENU</a>
            </div>
        </nav>

        <div class="container">
            <h1 class="text-center border m-3 p-3 bg-light">Cadastro de Produtos</h1>
            <form method="POST" action="/dcnrProduto" class="row g-3 m-3 p-3 bg-light">
            <div class="col-md-4">
                <label for="desc" class="form-label">Descrição do Produto</label>
                <input type="text" class="form-control" id="desc" name="desc">
            </div>
            <div class="col-md-4">
                <label for="codB" class="form-label">Código de Barras</label>
                <input type="number" class="form-control" id="codB" name="codB">
            </div>
            <div class="col-md-4">
                <label for="fabr" class="form-label">Nome do Fabricante</label>
                <input type="text" class="form-control" id="fabr" name="fabr">
            </div>
            <div class="col-md-3">
                <label for="custo" class="form-label">Preço de Custo</label>
                <div class="input-group has-validation">
                <span class="input-group-text" id="inputGroupPrepend">R$</span>
                <input type="number" class="form-control" id="custo" name="custo" aria-describedby="inputGroupPrepend">
                </div>
            </div>
            <div class="col-md-3">
                <label for="venda" class="form-label">Preço de Venda</label>
                <div class="input-group has-validation">
                <span class="input-group-text" id="inputGroupPrepend">R$</span>
                <input type="number" class="form-control" id="venda" name="venda" aria-describedby="inputGroupPrepend">
                </div>
            </div>
            <div class="col-md-3">
                <label for="qtde" class="form-label">Quantidade em Estoque</label>
                <input type="number" class="form-control" id="qtde" name="qtde">
            </div>
            <div class="col-md-3">
                <label for="valid" class="form-label">Data de Validade</label>
                <input type="date" class="form-control" id="valid" name="valid">
            </div>
            <div class="col-12">
                <button class="btn btn-primary" type="submit">Cadastrar</button>
            </div>
            </form>
        </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </html>
    `);
});

app.post("/dcnrProduto", (req, res) => {
    const {desc, codB, fabr, custo, venda, qtde, valid} = req.body;

    if(desc, codB, fabr, custo, venda, qtde, valid){
        listaProdutos.push({desc, codB, fabr, custo, venda, qtde, valid});
        res.redirect("/chcrProduto");
    } else {
        let resposta = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Atividade 04</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        </head>
        <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">MENU</a>
            </div>
        </nav>

        <div class="container">
            <h1 class="text-center border m-3 p-3 bg-light">Cadastro de Produtos</h1>
            <form method="POST" action="/dcnrProduto" class="row g-3 m-3 p-3 bg-light">
            <div class="col-md-4">
                <label for="desc" class="form-label">Descrição do Produto</label>
                <input type="text" class="form-control" id="desc" name="desc" value="${desc}">
        `;
        if(!desc){
            resposta += `<div><h6 class="text-danger">Por favor, escreva uma descrição</h6></div>`;
        }
        resposta += `
            </div>
            <div class="col-md-4">
                <label for="codB" class="form-label">Código de Barras</label>
                <input type="number" class="form-control" id="codB" name="codB" value="${codB}">
        `;
        if(!codB){
            resposta += `<div><h6 class="text-danger">Por favor, digite o código de barras</h6></div>`;
        }
        resposta += `
            </div>
            <div class="col-md-4">
                <label for="fabr" class="form-label">Nome do Fabricante</label>
                <input type="text" class="form-control" id="fabr" name="fabr" value="${fabr}">
        `;
        if(!fabr){
            resposta += `<div><h6 class="text-danger">Por favor, escreva o nome do fabricante</h6></div>`;
        }
        resposta += `
            </div>
            <div class="col-md-3">
                <label for="custo" class="form-label">Preço de Custo</label>
                <div class="input-group has-validation">
                <span class="input-group-text" id="inputGroupPrepend">R$</span>
                <input type="number" class="form-control" id="custo" name="custo" aria-describedby="inputGroupPrepend" value="${custo}">
                </div>
        `;
        if(!custo){
            resposta += `<div><h6 class="text-danger">Por favor, digite o preço de custo</h6></div>`;
        }
        resposta += `
            </div>
            <div class="col-md-3">
                <label for="venda" class="form-label">Preço de Venda</label>
                <div class="input-group has-validation">
                <span class="input-group-text" id="inputGroupPrepend">R$</span>
                <input type="number" class="form-control" id="venda" name="venda" aria-describedby="inputGroupPrepend" value="${venda}">
                </div>
        `;
        if(!venda){
            resposta += `<div><h6 class="text-danger">Por favor, digite o preço de venda</h6></div>`;
        }
        resposta += `
            </div>
            <div class="col-md-3">
                <label for="qtde" class="form-label">Quantidade em Estoque</label>
                <input type="number" class="form-control" id="qtde" name="qtde" value="${qtde}">
        `;
        if(!qtde){
            resposta += `<div><h6 class="text-danger">Por favor, digite a quantidade em estoque</h6></div>`;
        }
        resposta += `
            </div>
            <div class="col-md-3">
                <label for="valid" class="form-label">Data de Validade</label>
                <input type="date" class="form-control" id="valid" name="valid" value="${valid}">
        `;
        if(!valid){
            resposta += `<div><h6 class="text-danger">Por favor, selecione a data de validade</h6></div>`;
        }
        resposta += `
            </div>
            <div class="col-12">
                <button class="btn btn-primary" type="submit">Cadastrar</button>
            </div>
            </form>
        </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </html>
        `;

        res.send(resposta);
    }
});

app.get("/chcrProduto", verificaLog, (req, res) => {
    let ultimoAcesso = req.cookies?.ultimoAcesso;
    const data = new Date();
    res.cookie("ultimoAcesso", data.toLocaleString());

    let resposta = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Atividade 04</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </head>
    <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">MENU</a>
            <h5 class="d-flex p-2">Último acesso: ${ultimoAcesso || "Primeiro acesso"}</h5>
        </div>
    </nav>
    <div class="container">
        <h1 class="text-center border m-3 p-3 bg-light">Lista de produtos</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">Descrição</th>
                <th scope="col">Código de Barras</th>
                <th scope="col">Fabricante</th>
                <th scope="col">Preço de Custo</th>
                <th scope="col">Preço de Venda</th>
                <th scope="col">Quantidade</th>
                <th scope="col">Data de Validade</th>
                </tr>
            </thead>
            <tbody>`
        for(let i = 0; i < listaProdutos.length; i++){
            resposta += `
                <tr>
                    <td>${listaProdutos[i].desc}</td>
                    <td>${listaProdutos[i].codB}</td>
                    <td>${listaProdutos[i].fabr}</td>
                    <td>${listaProdutos[i].custo}</td>
                    <td>${listaProdutos[i].venda}</td>
                    <td>${listaProdutos[i].qtde}</td>
                    <td>${listaProdutos[i].valid}</td>
                </tr>
            `;
        }
        resposta += `
            </tbody>
            </table>
            </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </html>
        `;

    res.setHeader("Content-Type", "text/html")
    res.write(resposta);
    res.end();
});



//LOGIN



app.get("/signin", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Atividade 04</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        </head>
        <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">MENU</a>
            </div>
        </nav>

        <div class="container">
        <h1 class="text-center border m-3 p-3 bg-light">Sign In</h1>
        <form method="POST" action="/signar" class="row g-3 m-3 p-3 bg-light">
            <div class="col-8 mx-auto">
                <label for="usuario" class="form-label">Nome de Usuário</label>
                <input type="text" class="form-control" id="user" name="user" aria-describedby="emailHelp">
            </div>
            <div class="col-8 mx-auto">
                <label for="senha" class="form-label">Senha</label>
                <input type="password" class="form-control" id="pass" name="pass">
            </div>
            <div class="col-8 mx-auto">
                <label for="senha2" class="form-label">Repetir Senha</label>
                <input type="password" class="form-control" id="pass2" name="pass2">
            </div>
            <button type="submit" class="btn btn-primary col-5 mx-auto">Criar Conta</button>
        </form>
        </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </html>    
    `);
});

app.post("/signar", (req, res) => {
    const {user, pass, pass2} = req.body;

    if(user && pass && (pass == pass2)){
        req.session.dadosLogin = {
            logado: true,
            usuario: user,
            senha: pass
        };
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Atividade 04</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            </head>
            <body>
                <div class="container shadow p-3 bg-body rounded text-center">
                    <p class="fs-2">Conta criada com sucesso!</p>
                    <p class="fs-4">Clique <a href="/">aqui</a> para voltar ao menu principal.</p>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </html>
        `);
    } else {
        let resposta = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Atividade 04</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            </head>
            <body>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">MENU</a>
                </div>
            </nav>

            <div class="container">
            <h1 class="text-center border m-3 p-3 bg-light">Sign In</h1>
            <form method="POST" action="/signar" class="row g-3 m-3 p-3 bg-light">
                <div class="col-8 mx-auto">
                    <label for="usuario" class="form-label">Nome de Usuário</label>
                    <input type="text" class="form-control" id="user" name="user" value="${user}" aria-describedby="emailHelp">
        `;
        if(!user){
            resposta += `<div><h6 class="text-danger">Por favor, informe o seu Nome de Usuário</h6></div>`;
        }
        if(user == req.session?.dadosLogin?.usuario){
            resposta += `<div><h6 class="text-danger">Você já está usando este nome de usuário</h6></div>`;
        }
        resposta += `
                </div>
                <div class="col-8 mx-auto">
                    <label for="senha" class="form-label">Senha</label>
                    <input type="password" class="form-control" id="pass" name="pass" value="${pass}">
        `;
        if(!pass){
            resposta += `<div><h6 class="text-danger">Por favor, informe a sua Senha</h6></div>`;
        } else if(pass != pass2){
            resposta += `<div><h6 class="text-danger">As senhas não são iguais</h6></div>`;
        }

        resposta += `
                </div>
                <div class="col-8 mx-auto">
                    <label for="senha2" class="form-label">Repetir Senha</label>
                    <input type="password" class="form-control" id="pass2" name="pass2" value="${pass2}">
                </div>
                <button type="submit" class="btn btn-primary col-5 mx-auto">Criar Conta</button>
            </form>
            </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </html> 
        `;
        res.send(resposta);
    }
});

app.get("/login", (req, res) => {
    if(!req.session.dadosLogin){
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Atividade 04</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            </head>
            <body>
                <div class="container shadow p-3 bg-body rounded text-center">
                    <p class="fs-2">Você ainda não criou sua conta</p>
                    <p class="fs-4">Clique <a href="/signin">aqui</a> para ser direcionado para a página de Sign In.</p>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </html>
        `);
    } else {
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Atividade 04</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            </head>
            <body>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">MENU</a>
                </div>
            </nav>

            <div class="container">
            <h1 class="text-center border m-3 p-3 bg-light">Log In</h1>
            <form method="POST" action="/logar" class="row g-3 m-3 p-3 bg-light">
                <div class="col-8 mx-auto">
                    <label for="usuario" class="form-label">Usuário</label>
                    <input type="text" class="form-control" id="user" name="user" aria-describedby="emailHelp">
                </div>
                <div class="col-8 mx-auto">
                    <label for="senha" class="form-label">Senha</label>
                    <input type="password" class="form-control" id="pass" name="pass">
                </div>
                <button type="submit" class="btn btn-primary col-5 mx-auto">Entrar</button>
            </form>
            </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </html>   
        `);
    }
});

app.post("/logar", (req, res) => {
    const {user, pass} = req.body;

    if(user == req.session?.dadosLogin?.usuario && pass == req.session?.dadosLogin?.senha){
        req.session.dadosLogin.logado = true;
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Atividade 04</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            </head>
            <body>
                <div class="container shadow p-3 bg-body rounded text-center">
                    <p class="fs-2">Login efetuado com sucesso!</p>
                    <p class="fs-4">Clique <a href="/">aqui</a> para voltar ao menu principal.</p>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </html>
        `);
    } else {
        let resposta = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Atividade 04</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            </head>
            <body>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">MENU</a>
                </div>
            </nav>

            <div class="container">
            <h1 class="text-center border m-3 p-3 bg-light">Log In</h1>
            <form method="POST" action="/logar" class="row g-3 m-3 p-3 bg-light">
                <div class="col-8 mx-auto">
                    <label for="usuario" class="form-label">Usuário</label>
                    <input type="text" class="form-control" id="user" name="user" value="${user}" aria-describedby="emailHelp">
        `;
        if(user != req.session?.dadosLogin?.usuario){
            resposta += `<div><h6 class="text-danger">Usuário inválido</h6></div>`;
        }
        resposta += `
                </div>
                <div class="col-8 mx-auto">
                    <label for="senha" class="form-label">Senha</label>
                    <input type="password" class="form-control" id="pass" name="pass" value="${pass}">
        `;
        if(pass != req.session?.dadosLogin?.senha){
            resposta += `<div><h6 class="text-danger">Senha incorreta</h6></div>`;
        }

        resposta += `
                </div>
                <button type="submit" class="btn btn-primary col-5 mx-auto">Entrar</button>
            </form>
            </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </html>  
        `;

        res.send(resposta);
    }
});

app.post("/logout", (req, res) => {
    if(req.session.dadosLogin){
        req.session.dadosLogin.logado = false;
    }
    res.redirect("/");
});

function verificaLog(req, res, next){
    if(req.session?.dadosLogin?.logado){
        next();
    } else {
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Atividade 04</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            </head>
            <body>
                <div class="container shadow p-3 bg-body rounded text-center">
                    <p class="fs-2">Você não está cadastrado</p>
                    <p class="fs-4">Clique <a href="/">aqui</a> para voltar ao menu principal e criar ou entrar na sua conta</p>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </html>   
        `);
    }
}