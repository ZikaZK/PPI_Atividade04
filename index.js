import express, { response } from "express";
const host = "localhost";
const porta = 3000;
const app = express();

var listaFornecedores = [];
var listaProdutos = [];
let logado = false;
let usuario; let senha;

app.listen(porta, host, () => {
    console.log(`Aplicação rodando em http://${host}:${porta}`)
});

app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => {
    let resposta = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Atividade 03</title>
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
        if(logado){
            resposta += `<h1 class="text-center border m-3 p-3 bg-light">Bem-vindo(a), ${usuario}!</h1>`;
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
                    <h5 class="card-title">Fornecedores</h5>
                    <p class="card-text">Gerencie todos os nossos fornecedores aqui</p>
                    <a href="/cdstrFornecedor" class="card-link">Cadastrar</a>
                    <a href="/chcrFornecedor" class="card-link">Checar</a>
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



app.get("/cdstrProduto", (req, res) => {
    let resposta = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Atividade 03</title>
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
                <label for="produto" class="form-label">Nome do Produto</label>
                <input type="text" class="form-control" id="produto" name="produto">
            </div>
            <div class="col-md-4">
                <label for="codigo" class="form-label">Código do Produto</label>
                <input type="number" class="form-control" id="codigo" name="codigo">
            </div>
            <div class="col-md-4">
                <label for="preco" class="form-label">Preço do Produto</label>
                <div class="input-group has-validation">
                <span class="input-group-text" id="inputGroupPrepend">R$</span>
                <input type="number" class="form-control" id="preco" name="preco" aria-describedby="inputGroupPrepend">
                </div>
            </div>
            <div class="col-md-6">
                <label for="descricao" class="form-label">Descrição do Produto</label>
                <input type="text" class="form-control" id="descricao" name="descricao">
            </div>
            <div class="col-md-3">
                <label for="categoria" class="form-label">Categoria do Produto</label>
                <select class="form-select" id="categoria" name="categoria">
                <option selected disabled value="">Escolha</option>
                <option>Medicamentos</option>
                <option>Higiene Pessoal e Beleza</option>
                <option>Dermocosméticos</option>
                <option>Cuidados Infantis</option>
                <option>Suplementos e Nutrição</option>
                <option>Primeiros Socorros e Ortopedia</option>
                <option>Higiene Bucal</option>
                <option>Perfumaria</option>
                </select>
            </div>
            <div class="col-md-3">
                <label for="fornecedor" class="form-label">Fornecedor do Produto</label>
                <select class="form-select" id="fornecedor" name="fornecedor">
                <option selected disabled value="">Escolha</option>
    `;
    if(listaFornecedores.length == 0){
        resposta += `</select><div><h6 class="text-danger">Não há fornecedores cadastrados no sistema</h6></div>`;
    } else {
        for(let i = 0; i < listaFornecedores.length; i++){
            resposta += `<option>${listaFornecedores[i].nomFan}</option>`;
        }
        resposta += `</select>`;
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
});

app.post("/dcnrProduto", (req, res) => {
    const produto = req.body.produto;
    const codigo = req.body.codigo;
    const preco = req.body.preco;
    const descricao = req.body.descricao;
    const categoria = req.body.categoria;
    const fornecedor = req.body.fornecedor;

    if(produto && codigo && preco && descricao && categoria && fornecedor){
        listaProdutos.push({produto, codigo, preco, descricao, categoria, fornecedor});
        res.redirect("/chcrProduto");
    } else {
        let resposta = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Atividade 03</title>
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
                <label for="produto" class="form-label">Nome do Produto</label>
                <input type="text" class="form-control" id="produto" name="produto" value="${produto}">
        `;
        if(!produto){
            resposta += `<div><h6 class="text-danger">Por favor, informe o Nome do Produto</h6></div>`;
        }
        resposta += `
            </div>
            <div class="col-md-4">
                <label for="codigo" class="form-label">Código do Produto</label>
                <input type="number" class="form-control" id="codigo" name="codigo" value="${codigo}">
        `;
        if(!codigo){
            resposta += `<div><h6 class="text-danger">Por favor, digite o Código</h6></div>`;
        }
        resposta += `
            </div>
            <div class="col-md-4">
                <label for="preco" class="form-label">Preço do Produto</label>
                <div class="input-group has-validation">
                <span class="input-group-text" id="inputGroupPrepend">R$</span>
                <input type="number" class="form-control" id="preco" name="preco" value="${preco}" aria-describedby="inputGroupPrepend">
                </div>
        `;
        if(!preco){
            resposta += `<div><h6 class="text-danger">Por favor, digite o Preço</h6></div>`;
        }
        resposta += `
            </div>
            <div class="col-md-6">
                <label for="descricao" class="form-label">Descrição do Produto</label>
                <input type="text" class="form-control" id="descricao" name="descricao" value="${descricao}">
        `;
        if(!descricao){
            resposta += `<div><h6 class="text-danger">Por favor, informe a Descrição</h6></div>`;
        }
        resposta += `
            </div>
            <div class="col-md-3">
                <label for="categoria" class="form-label">Categoria do Produto</label>
                <select class="form-select" id="categoria" name="categoria">
                <option selected disabled value="">Escolha</option>
                <option>Medicamentos</option>
                <option>Higiene Pessoal e Beleza</option>
                <option>Dermocosméticos</option>
                <option>Cuidados Infantis</option>
                <option>Suplementos e Nutrição</option>
                <option>Primeiros Socorros e Ortopedia</option>
                <option>Higiene Bucal</option>
                <option>Perfumaria</option>
                </select>
        `;
        if(!categoria){
            resposta += `<div><h6 class="text-danger">Por favor, escolha uma Categoria</h6></div>`;
        }
        resposta += `
            </div>
            <div class="col-md-3">
                <label for="fornecedor" class="form-label">Fornecedor do Produto</label>
                <select class="form-select" id="fornecedor" name="fornecedor">
                <option selected disabled value="">Escolha</option>
        `;
        if(listaFornecedores.length == 0){
            resposta += `</select><div><h6 class="text-danger">Não há fornecedores cadastrados no sistema</h6></div>`;
        } else {
            for(let i = 0; i < listaFornecedores.length; i++){
                resposta += `<option>${listaFornecedores[i].nomFan}</option>`;
            }
            resposta += `</select>`;
            if(!fornecedor){
                resposta += `<div><h6 class="text-danger">Por favor, escolha um Fornecedor</h6></div>`;
            }
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

app.get("/chcrProduto", (req, res) => {
    let resposta = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Atividade 02</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </head>
    <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">MENU</a>
        </div>
    </nav>
    <div class="container">
        <h1 class="text-center border m-3 p-3 bg-light">Lista de produtos</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">Produto</th>
                <th scope="col">Descrição</th>
                <th scope="col">Preço</th>
                <th scope="col">Código</th>
                <th scope="col">Categoria</th>
                <th scope="col">Fornecedor</th>
                </tr>
            </thead>
            <tbody>`
        for(let i = 0; i < listaProdutos.length; i++){
            resposta += `
                <tr>
                    <td>${listaProdutos[i].produto}</td>
                    <td>${listaProdutos[i].descricao}</td>
                    <td>${listaProdutos[i].preco}</td>
                    <td>${listaProdutos[i].codigo}</td>
                    <td>${listaProdutos[i].categoria}</td>
                    <td>${listaProdutos[i].fornecedor}</td>
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

    res.send(resposta);
});



//FORNECEDORES



app.get("/cdstrFornecedor", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Atividade 03</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        </head>
        <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">MENU</a>
            </div>
        </nav>

        <div class="container">
            <h1 class="text-center border m-3 p-3 bg-light">Cadastro de Fornecedores</h1>
            <form method="POST" action="/dcnrFornecedor" class="row g-3 m-3 p-3 bg-light">
                <div class="col-md-4">
                    <label for="cnpj" class="form-label">CNPJ</label>
                    <input type="number" class="form-control" id="cnpj" name="cnpj">
                </div>
                <div class="col-md-4">
                    <label for="razSoc" class="form-label">Razão Social ou Nome do Fornecedor</label>
                    <input type="text" class="form-control" id="razSoc" name="razSoc">
                </div>
                <div class="col-md-4">
                    <label for="nomFan" class="form-label">Nome Fantasia</label>
                    <input type="text" class="form-control" id="nomFan" name="nomFan">
                </div>
                <div class="col-md-7">
                    <label for="endereco" class="form-label">Endereço</label>
                    <input type="text" class="form-control" id="endereco" name="endereco">
                </div>
                <div class="col-md-3">
                    <label for="cidade" class="form-label">Cidade</label>
                    <input type="text" class="form-control" id="cidade" name="cidade">
                </div>
                <div class="col-md-2">
                    <label for="uf" class="form-label">UF</label>
                    <select class="form-select" id="uf" name="uf">
                    <option selected disabled value="">Selecione</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label for="cep" class="form-label">CEP</label>
                    <input type="number" class="form-control" id="cep" name="cep">
                </div>
                <div class="col-md-5">
                    <label for="email" class="form-label">E-mail</label>
                    <input type="email" class="form-control" id="email" name="email">
                </div>
                <div class="col-md-5">
                    <label for="telefone" class="form-label">Telefone</label>
                    <input type="tel" class="form-control" id="telefone" name="telefone">
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

app.post("/dcnrFornecedor", (req, res) => {
    const cnpj = req.body.cnpj;
    const razSoc = req.body.razSoc;
    const nomFan = req.body.nomFan;
    const endereco = req.body.endereco;
    const cidade = req.body.cidade;
    const uf = req.body.uf;
    const cep = req.body.cep;
    const email = req.body.email;
    const telefone = req.body.telefone;

    if(cnpj && razSoc && nomFan && endereco && cidade && uf && cep && email && telefone){
        listaFornecedores.push({cnpj, razSoc, nomFan, endereco, cidade, uf, cep, email, telefone});
        res.redirect("/chcrFornecedor");
    } else {
        let resposta = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Atividade 03</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        </head>
        <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">MENU</a>
            </div>
        </nav>

        <div class="container">
            <h1 class="text-center border m-3 p-3 bg-light">Cadastro de Fornecedores</h1>
            <form method="POST" action="/dcnrFornecedor" class="row g-3 m-3 p-3 bg-light">
                <div class="col-md-4">
                    <label for="cnpj" class="form-label">CNPJ</label>
                    <input type="number" class="form-control" id="cnpj" name="cnpj" value="${cnpj}">
        `;
        if(!cnpj){
            resposta += `<div><h6 class="text-danger">Por favor, digite o CNPJ</h6></div>`;
        }
        resposta += `
                </div>
                <div class="col-md-4">
                    <label for="razSoc" class="form-label">Razão Social ou Nome do Fornecedor</label>
                    <input type="text" class="form-control" id="razSoc" name="razSoc" value="${razSoc}">
        `;
        if(!razSoc){
            resposta += `<div><h6 class="text-danger">Por favor, informe a Razão Social ou Nome do Fornecedor</h6></div>`;
        }
        resposta += `
                </div>
                <div class="col-md-4">
                    <label for="nomFan" class="form-label">Nome Fantasia</label>
                    <input type="text" class="form-control" id="nomFan" name="nomFan" value="${nomFan}">
        `;
        if(!nomFan){
            resposta += `<div><h6 class="text-danger">Por favor, informe o Nome Fantasia</h6></div>`;
        }
        resposta += `
                </div>
                <div class="col-md-7">
                    <label for="endereco" class="form-label">Endereço</label>
                    <input type="text" class="form-control" id="endereco" name="endereco" value="${endereco}">
        `;
        if(!endereco){
            resposta += `<div><h6 class="text-danger">Por favor, informe o Endereço</h6></div>`;
        }
        resposta += `
                </div>
                <div class="col-md-3">
                    <label for="cidade" class="form-label">Cidade</label>
                    <input type="text" class="form-control" id="cidade" name="cidade" value="${cidade}">
        `;
        if(!cidade){
            resposta += `<div><h6 class="text-danger">Por favor, informe a Cidade</h6></div>`;
        }
        resposta += `
                </div>
                <div class="col-md-2">
                    <label for="uf" class="form-label">UF</label>
                    <select class="form-select" id="uf" name="uf">
                    <option selected disabled value="">Selecione</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                    </select>
        `;
        if(!uf){
            resposta += `<div><h6 class="text-danger">Por favor, selecione uma Unidade Federativa</h6></div>`;
        }
        resposta += `
                </div>
                <div class="col-md-2">
                    <label for="cep" class="form-label">CEP</label>
                    <input type="number" class="form-control" id="cep" name="cep" value="${cep}">
        `;
        if(!cep){
            resposta += `<div><h6 class="text-danger">Por favor, digite o CEP</h6></div>`;
        }
        resposta += `
                </div>
                <div class="col-md-5">
                    <label for="email" class="form-label">E-mail</label>
                    <input type="email" class="form-control" id="email" name="email" value="${email}">
        `;
        if(!email){
            resposta += `<div><h6 class="text-danger">Por favor, informe o E-mail</h6></div>`;
        }
        resposta += `
                </div>
                <div class="col-md-5">
                    <label for="telefone" class="form-label">Telefone</label>
                    <input type="tel" class="form-control" id="telefone" name="telefone" value="${telefone}">
        `;
        if(!telefone){
            resposta += `<div><h6 class="text-danger">Por favor, digite o Telefone</h6></div>`;
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

app.get("/chcrFornecedor", (req, res) => {
    let resposta = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Atividade 03</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </head>
    <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">MENU</a>
        </div>
    </nav>
    <div class="container">
        <h1 class="text-center border m-3 p-3 bg-light">Lista de Fornecedores</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">CNPJ</th>
                <th scope="col">Razão Social</th>
                <th scope="col">Nome Fantasia</th>
                <th scope="col">Endereço</th>
                <th scope="col">Cidade</th>
                <th scope="col">UF</th>
                <th scope="col">CEP</th>
                <th scope="col">E-mail</th>
                <th scope="col">Telefone</th>
                </tr>
            </thead>
            <tbody>`
        for(let i = 0; i < listaFornecedores.length; i++){
            resposta += `
                <tr>
                    <td>${listaFornecedores[i].cnpj}</td>
                    <td>${listaFornecedores[i].razSoc}</td>
                    <td>${listaFornecedores[i].nomFan}</td>
                    <td>${listaFornecedores[i].endereco}</td>
                    <td>${listaFornecedores[i].cidade}</td>
                    <td>${listaFornecedores[i].uf}</td>
                    <td>${listaFornecedores[i].cep}</td>
                    <td>${listaFornecedores[i].email}</td>
                    <td>${listaFornecedores[i].telefone}</td>
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

    res.send(resposta);
});



//LOGIN



app.get("/signin", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Atividade 03</title>
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
                <input type="text" class="form-control" id="usuario" name="usuario" aria-describedby="emailHelp">
            </div>
            <div class="col-8 mx-auto">
                <label for="senha" class="form-label">Senha</label>
                <input type="password" class="form-control" id="senha" name="senha">
            </div>
            <div class="col-8 mx-auto">
                <label for="senha2" class="form-label">Repetir Senha</label>
                <input type="password" class="form-control" id="senha2" name="senha2">
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
    const user = req.body.usuario;
    const pass = req.body.senha;
    const pass2 = req.body.senha2;

    if(user && pass && (pass == pass2)){
        usuario = user;
        senha = pass;
        logado = true;
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Atividade 03</title>
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
                <title>Atividade 03</title>
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
                    <input type="text" class="form-control" id="usuario" name="usuario" value="${user}" aria-describedby="emailHelp">
        `;
        if(!user){
            resposta += `<div><h6 class="text-danger">Por favor, informe o seu Nome de Usuário</h6></div>`;
        }
        if(user == usuario){
            resposta += `<div><h6 class="text-danger">Você já está usando este nome de usuário</h6></div>`;
        }
        resposta += `
                </div>
                <div class="col-8 mx-auto">
                    <label for="senha" class="form-label">Senha</label>
                    <input type="password" class="form-control" id="senha" name="senha" value="${pass}">
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
                    <input type="password" class="form-control" id="senha2" name="senha2" value="${pass2}">
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
    if(!usuario && !senha){
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Atividade 03</title>
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
                <title>Atividade 03</title>
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
                    <input type="text" class="form-control" id="usuario" name="usuario" aria-describedby="emailHelp">
                </div>
                <div class="col-8 mx-auto">
                    <label for="senha" class="form-label">Senha</label>
                    <input type="password" class="form-control" id="senha" name="senha">
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
    const user = req.body.usuario;
    const pass = req.body.senha;

    if(user == usuario && pass == senha){
        logado = true;
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Atividade 03</title>
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
                <title>Atividade 03</title>
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
                    <input type="text" class="form-control" id="usuario" name="usuario" value="${user}" aria-describedby="emailHelp">
        `;
        if(user != usuario){
            resposta += `<div><h6 class="text-danger">Usuário inválido</h6></div>`;
        }
        resposta += `
                </div>
                <div class="col-8 mx-auto">
                    <label for="senha" class="form-label">Senha</label>
                    <input type="password" class="form-control" id="senha" name="senha" value="${pass}">
        `;
        if(pass != senha){
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
    logado = false;
    res.redirect("/");
});