export const formObj = {
    nombre: "",
    correo: "",
    telefono: 0,
    empresa: ""
}


// Selectores
export const nombreForm = document.querySelector("#nombre")
export const correoForm = document.querySelector("#email")
export const telefonoForm = document.querySelector("#telefono")
export const empresaForm = document.querySelector("#empresa")



nombreForm.addEventListener("blur", (e)=> {
    formObj.nombre = e.target.value
    //console.log(formObj)
})
correoForm.addEventListener("blur", (e)=> {
    formObj.correo = e.target.value
    //console.log(formObj)
})
telefonoForm.addEventListener("blur", (e)=> {
    formObj.telefono = e.target.value
    //console.log(formObj)
})
empresaForm.addEventListener("blur", (e)=> {
    formObj.empresa = e.target.value
    //console.log(formObj)
})