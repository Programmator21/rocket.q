const express = require('express')
const route = require('./route')
const path = require('path')
const server = express()
// constante para subir o node no terminal e navegador
server.set('view engine', 'ejs')
server.use(express.static("public"))
server.set('views', path.join(__dirname, 'views'))
// processo para fazer o node abrir um "html" por meio do ejs
// __dirname é uma variável padrão que busca o diretório de origem "src"
server.use(express.urlencoded({extended: true}))
server.use(route)
server.listen(3000, () => console.log("Running. .. ..."))
// processo para determinar endereço do serviço e informação ao entrar no console
// no javaScript é possível substituir "function "open"(){}" por "() =>"