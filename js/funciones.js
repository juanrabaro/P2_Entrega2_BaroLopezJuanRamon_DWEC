import { contenidoDB, borrarListaContenidoDB, borrarCliente } from "./bd.js"

export const tbody = document.querySelector("#listado-clientes")
export var ultimoIDTabla

export function cargarTabla(contenidoDB) {
    var idBtnBorrar
    contenidoDB.forEach(elementoDB => {
        idBtnBorrar = contenidoDB[contenidoDB.indexOf(elementoDB)].crm
        ultimoIDTabla = idBtnBorrar
        tbody.innerHTML +=
        `
        <tr>
            <td>${elementoDB.nombre}</td>
            <td>${elementoDB.telefono}</td>
            <td>${elementoDB.empresa}</td>
            <td>
                <input type="button" class="editarFila" value="editar">
                <input type="button" class="borrarFila" id="${idBtnBorrar}" value="borrar">
            </td>
        </tr>
        `
    })

    const botonesBorrar = document.querySelectorAll(".borrarFila")
    botonesBorrar.forEach(botonBorrar => {
        botonBorrar.addEventListener("click", (e) => {
            borrarCliente(parseInt(e.target.id))
            console.log(e.target.id)
        })
    })

    const botonesEditar = document.querySelectorAll(".editarFila")
    botonesEditar.forEach(botonEditar => {
        botonEditar.addEventListener("click", (e) => {
            var clienteEditar = {}
            contenidoDB.forEach(objCliente => {
                if ( objCliente.crm === parseInt(e.target.nextElementSibling.id) ) {
                    clienteEditar = objCliente
                }
            })
            localStorage.setItem('clienteEditar', `${clienteEditar.nombre},${clienteEditar.correo},${clienteEditar.telefono},${clienteEditar.empresa},${clienteEditar.crm}`)
            window.location.href = "editar-cliente.html"
        })
    })
}


export function borrarTabla() {
    while (tbody.firstChild) {
        tbody.firstChild.remove()
    }
    borrarListaContenidoDB()
}

