import { DB, contenidoDB, crmDB, crearCliente, verClientes, borrarCliente, actualizarCliente, borrarListaContenidoDB, getCliente } from "./bd.js"
import { cargarTabla, borrarTabla, tbody } from "./funciones.js"
import { formObj } from "./nuevocliente.js"



const botonAñadir = document.querySelector("#botonAñadir")

document.addEventListener("DOMContentLoaded", () => {
    crmDB()
    
    setTimeout(() => {
        // if hay datos en el localStorage
        // Traer datos localStorage
        // Borrar localStorage
        // Transformar la información para tener el objeto nuevo y el crm por separado
        // actualizarCliente(nuevoCliente, crm)

        var informacion = localStorage.getItem('clienteEditar')
        if ( informacion ) {
            console.log("hay info")

            var listaCampos = informacion.split(",")

            const objCliente = {
                nombre: listaCampos[0],
                correo: listaCampos[1],
                telefono: listaCampos[2],
                empresa: listaCampos[3],
                crm: parseInt(listaCampos[4])
            }

            const crm = objCliente.crm

            const objClienteActualizado = {
                nombre: objCliente.nombre,
                correo: objCliente.correo,
                telefono: objCliente.telefono,
                empresa: objCliente.empresa
            }

            console.log(objClienteActualizado)
            console.log(parseInt(crm))

            actualizarCliente(objClienteActualizado)
            borrarCliente(parseInt(crm))

        
        } else {
            console.log("no hay info")
            borrarTabla()
            verClientes()
        }
        

        localStorage.clear()
        console.log("localStorage borrado")

        setTimeout(() => {
            botonAñadir.addEventListener("click", (e) => {
                //Crear cliente con datos formulario crearCliente(nuevoCliente)
                crearCliente(formObj)
            })
        }, 1000)

    }, 1000)
})