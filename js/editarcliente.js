
const nombreForm = document.querySelector("#nombre")
const correoForm = document.querySelector("#email")
const telefonoForm = document.querySelector("#telefono")
const empresaForm = document.querySelector("#empresa")

const botonActualizar = document.querySelector('input[type="submit"]')

var informacion = localStorage.getItem('clienteEditar')

var listaCampos = informacion.split(",")

const objCliente = {
    nombre: listaCampos[0],
    correo: listaCampos[1],
    telefono: listaCampos[2],
    empresa: listaCampos[3],
    crm: listaCampos[4]
}

const crm = objCliente.crm

const objClienteActualizado = {
    nombre: "",
    correo: "",
    telefono: "",
    empresa: ""
}

nombreForm.value = objCliente.nombre
correoForm.value = objCliente.correo
telefonoForm.value = objCliente.telefono
empresaForm.value = objCliente.empresa


objClienteActualizado.nombre = objCliente.nombre
objClienteActualizado.correo = objCliente.correo
objClienteActualizado.telefono = objCliente.telefono
objClienteActualizado.empresa = objCliente.empresa


nombreForm.addEventListener("blur", (e)=> {
    objClienteActualizado.nombre = e.target.value
})
correoForm.addEventListener("blur", (e)=> {
    objClienteActualizado.correo = e.target.value
})
telefonoForm.addEventListener("blur", (e)=> {
    objClienteActualizado.telefono = e.target.value
})
empresaForm.addEventListener("blur", (e)=> {
    objClienteActualizado.empresa = e.target.value
})


botonActualizar.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(crm)
    console.log(objClienteActualizado.nombre)
    console.log(objClienteActualizado.correo)
    console.log(objClienteActualizado.telefono)
    console.log(objClienteActualizado.empresa)

    // setItem("clienteEditar", "toda la info de objClienteActualizado y el crm")
    localStorage.setItem('clienteEditar', `${objClienteActualizado.nombre},${objClienteActualizado.correo},${objClienteActualizado.telefono},${objClienteActualizado.empresa},${crm}`)
    
    window.location.href = "index.html"

})