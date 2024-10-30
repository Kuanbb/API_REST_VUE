const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()

app.use(bodyParser.json());

app.use(cors());

let produtos = [
    {
        "id":"",
        "descricao":"",
        "marca":"",
        "valor":"",
        "quantidade":""
    }
]

app.post("/produtos",(req,res)=>{
    const produto = req.body
    produtos.push(produto)
    res.status(201).send("Produto criado.")
})

app.get("/produtos/:id", (req,res)=>{
    const id = req.params.id
    const produto = produtos.find(u=>u.id===id)
    if(produto){
        res.json(produto)
    }else{
        res.status(404).send("Registro não encontrado")
    }
})

app.put("/produtos/:id", (req,res)=>{
    const id = req.params.id
    const indicie = produtos.findIndex(u=>u.id===id)
    if(indicie!==-1){
        produto[indicie]=req.body
        res.send("registro atualizado")
    }else{
        res.status(404).send("Registro não encontrado")
    }
})

app.delete("produto/:id", (req,res)=>{
    const id = req.params.id
    const produtos = produtos.filter(u=>u.id!==id)
    const index = produtos.findIndex(u=>u.id===id)
    produtos.splice(index,1)
})

app.get("/produtos", (req,res)=>{
    res.json(produtos)
})

app.listen(3000, (err)=>{
    if(err){
        console.log(`Algo errado:${err}`)
    }else{
        console.log('Conectado')
    }
})