const Contenedor  = require('../server.js')

// const products = [
//     { nombre: "regla", precio: 100, url: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png" },
//     { nombre: "lapiz", precio: 200, url: "https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-512.png" },
//     { nombre: "cuaderno", precio: 300, url: "https://cdn2.iconfinder.com/data/icons/mixed-rounded-flat-icon/512/note-512.png" },
// ]

const getProducts = (req, res) => {
    res.render('index', { products })
}

const addProduct = (req, res) => {
 
    const { nombre, precio, url } = req.body
    let id = products.length + 1
    products.push({ nombre, precio, url, id })
    res.render('products', { products })    
}

const showForm = (req, res) => {
    res.render('productsForm', { products })
}

module.exports = { getProducts, addProduct, showForm }