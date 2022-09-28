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


app.use(express.static(path.join(__dirname, '../public')))

const productos = [{ nombre: "regla", precio: 100, url: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png" },
{ nombre: "lapiz", precio: 200, url: "https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-512.png" },
{ nombre: "cuaderno", precio: 300, url: "https://cdn2.iconfinder.com/data/icons/mixed-rounded-flat-icon/512/note-512.png" },
]

// Los mensajes deben persistir en el servidor en un archivo.

const fs = require('fs')
let messagesArray = []

// Función para obtener mensajes de file System

const getAll = async () => {
    try {
        const messagesArray = JSON.parse(await fs.promises.readFile('./mensajes.txt', 'utf-8'))
        console.log(messagesArray)
    } catch (error) {
        console.log(`Ocurrió el siguiente error: ${error}`)
    }
}

getAll()

// Función para guardar mensajes de file System

const save = async () => {

    try {
        await fs.promises.writeFile('./mensajes.txt', JSON.stringify(messagesArray))
    } catch (error) {
        console.log(`Ocurrió el siguiente error: ${error}`)
    }
}

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
        save()
        io.emit('server:message', messagesArray)
    })
})

// Configuración para acceder al req body

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', rutas)
