const socket = io()
// Formulario de productos

const productsForm = document.querySelector('#productsForm')
const nombreInput = document.querySelector('#nombreInput')
const precioInput = document.querySelector('#precioInput')
const urlInput = document.querySelector('#urlInput')
const formularioProductos = document.querySelector('#formularioProductos')

// Formulario de chat

const chat = document.querySelector('#chat')
const chatForm = document.querySelector('#chatForm')
const mailInput = document.querySelector('#mailInput')
const mensajeInput = document.querySelector('#mensajeInput')
const chatPool = document.querySelector('#chatPool')

// Mostrar productos

function renderProducts(productos) {
    fetch('/plantilla1.hbs').then(response => {
        response.text().then((plantilla) => {

            productos.forEach(producto => {
                const template = Handlebars.compile(plantilla);
                const html = template(producto);
                document.querySelector('#productos').innerHTML += html;

            })
        })
    })
}

socket.on('server:productos', productos => {

    renderProducts(productos)
});

// Agregar productos

function sendProduct(producto) {
    socket.emit('client:producto', producto)
}

productsForm.addEventListener('submit', event => {
    event.preventDefault()

    const producto = { mail: nombreInput.value, precio: precioInput.value, url: urlInput.value }
    sendProduct(producto)
})

// Mostrar chat

function renderChat(messagesArray) {
    
    fetch('/chatPool.hbs').then(response => {
        response.text().then((plantilla) => {
                messagesArray.forEach(message => {
                const template = Handlebars.compile(plantilla);
                const html = template(message);
                document.querySelector('#chatPool').innerHTML += html;
                
            })
        })
    })
}

socket.on('server:message', messagesArray => {

    renderChat(messagesArray)
});

// Agregar mensaje en chat

function sendMessage(message) {

    socket.emit('client:message', message)
}

chatForm.addEventListener('submit', event => {
    event.preventDefault()

    const message = { mail: mailInput.value, fecha: Date(), msg: mensajeInput.value }
    sendMessage(message)

})
