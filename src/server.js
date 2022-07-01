const express = require('express')
const app = express()
const path = require('path')
const { Server: IOServer } = require('socket.io')
const expressServer = app.listen(8080, err => {
    if (err) {
        console.log(`Ocurrió un error: ${err}`)
    } else {
        console.log('Escuchando el puerto 8080')
    }
})
const io = new IOServer(expressServer)
const rutas = require('./routes/index')


const productos = [{ nombre: "regla", precio: 100, url: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png" },
{ nombre: "lapiz", precio: 200, url: "https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-512.png" },
{ nombre: "cuaderno", precio: 300, url: "https://cdn2.iconfinder.com/data/icons/mixed-rounded-flat-icon/512/note-512.png" },
]
const messagesArray = [{ mail: 'usuario1@gmail.com', fecha: "30/06/22", msg: 'Hola' },
{ mail: 'usuario2@gmail.com', fecha: "30/06/22", msg: 'Hola' }
]


app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', socket => {

    // Productos

    socket.emit('server:productos', productos)
    console.log(`Se conectó el cliente ${socket.id}`)
    socket.on('client:producto', producto => {
        productos.push(producto)
        io.emit('server:productos', productos)
    })

    // Chat

    socket.emit('server:message', messagesArray)
    socket.on('client:message', message => {
        messagesArray.push(message)
        io.emit('server:message', messagesArray)
    })
})

// Configuración para acceder al req body

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', rutas)
