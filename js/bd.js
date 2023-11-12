import { borrarTabla, cargarTabla } from "./funciones.js"
import { nombreForm, correoForm, telefonoForm, empresaForm} from "./nuevocliente.js"


export var DB
export var contenidoDB = []


export function crmDB() {
    const crmDB = window.indexedDB.open("crm", 1.0)

    crmDB.onerror = function () {
        console.log("Hubo un error")
    }

    crmDB.onsuccess = function () {
        DB = crmDB.result
        console.log(DB)
    }

    // este método solo ejecuta una vez
    crmDB.onupgradeneeded = function (e) {
        const db = e.target.result

        // definir el objectstore, primer parametro el nombre de la BD, segundo las opciones
        // keypath es de donde se van a obtener los indices
        const objectStore = db.createObjectStore("crm", {
            keyPath: "crm",
            autoIncrement: true,
        })

        // createindex, nombre y keypath, 3ro los parametros, keypath esn este caso sera el indice para poder realizar busquedas
        objectStore.createIndex("nombre", "nombre", { unique: false })
        objectStore.createIndex("email", "email", { unique: true })
        objectStore.createIndex("telefono", "telefono", { unique: false })

        console.log("DB creada y lista")
    }
}

export function crearCliente(nuevoCliente) {
    // Crear un nuevo registro
    const transaction = DB.transaction(["crm"], "readwrite")
    transaction.oncomplete = function (e) {
        console.log("Transacción Completada")
    }

    transaction.onerror = function (e) {
        console.log("Hubo un error en la transacción")
    }

    const objectStore = transaction.objectStore("crm")
    //console.log(objectStore)

    /*
    const nuevoCliente = {
        nombre: "Pablo2",
        email: "correo3@correo.com",
        telefono: 2131123,
        empresa: "empresaA",
    }
    const nuevoCliente = {
        nombre: "Juan",
        email: "correo@correo.com",
        telefono: 1020012,
        empresa: "empresaB",
    }*/

    const peticion = objectStore.add(nuevoCliente)
    contenidoDB.push(nuevoCliente)
    console.log(nombreForm.value);
    nombreForm.value = ""
    correoForm.value = ""
    telefonoForm.value = ""
    empresaForm.value = ""

    borrarTabla()
    verClientes()
}

export function verClientes() {
    const transaction = DB.transaction(["crm"], "readonly")
    transaction.oncomplete = function (e) {
        console.log("Clientes cargados y mostrados")
    }

    transaction.onerror = function (e) {
        console.log("Hubo un error en la transacción")
    }

    const objectStore = transaction.objectStore("crm")

    const peticion = objectStore.openCursor()
    contenidoDB = []
    peticion.onsuccess = function (e) {
        var cursor = e.target.result
        if ( cursor ) {
            contenidoDB.push(cursor.value)
            cursor.continue()
        } else {
            console.log("ya no hay más clientes")
            cargarTabla(contenidoDB)
        }
    }
    peticion.onerror = function (e) {
        console.log("error")
    }
}

export function borrarCliente(id) {
    // El id será el crm del objeto
    const transaction = DB.transaction(["crm"], "readwrite")
    transaction.oncomplete = function (e) {
        console.log("Transacción Borrado")
    }
    transaction.onerror = function (e) {
        console.log("Hubo un error en la transacción")
    }
    
    const objectStore = transaction.objectStore("crm")
    console.log(objectStore);
    const deleteRequest = objectStore.delete(id)
    console.log(deleteRequest);
    deleteRequest.oncomplete = function (e) {
        console.log("Borrado Completo")
    }
    deleteRequest.onerror = function (e) {
        console.log("Hubo un error en la transacción")
    }

    //borrarListaContenidoDB()
    borrarTabla()
    verClientes()
}

export function actualizarCliente(nuevoCliente) {
    const transaction = DB.transaction(["crm"], "readwrite")
    transaction.oncomplete = function (e) {
        console.log("Transacción Completada")
    }
    transaction.onerror = function (e) {
        console.log("Hubo un error en la transacción")
    }
    
    const objectStore = transaction.objectStore("crm")
    const updateRequest = objectStore.put(nuevoCliente)
    updateRequest.onsuccess = function (e) {
        console.log("updated")
    }
    updateRequest.onerror = function (e) {
        console.log("no result")
    }

    //borrarListaContenidoDB()
    //borrarTabla()
    //verClientes()
}

export function borrarListaContenidoDB() {
    contenidoDB = []
}

export function getCliente(id) {
    const transaction = DB.transaction(["crm"], "readwrite")
    transaction.oncomplete = function (e) {
        console.log("transaction get")
    }
    transaction.onerror = function (e) {
        console.log("no transaction get")
    }
    const objectStore = transaction.objectStore("crm")
    const requestGet = objectStore.get(parseInt(id))
    requestGet.onsuccess = function (e) {
        console.log(requestGet.result)
    }
    requestGet.onerror = function (e) {
        console.log("no result")
    }
    
}