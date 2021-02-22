window.onload = () =>
{
    validation();
    document.getElementById("submitCiudad").addEventListener('click', tiempo);
}
var minombre=document.getElementById("idNombre").value;
var miciudad=document.getElementById("idCiudad").value;
var mipais=document.getElementById("idPais").value;
document.getElementById("ciudad").innerHTML=miciudad;
document.getElementById("pais").innerHTML=mipais;

//VALIDATION
(function validation(idciudad,idpais) {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()
//API
function tiempo (tem){
    tem.preventDefault();
    var nombre = document.getElementById("idNombre").value;
    var ciudad = document.getElementById("idCiudad").value;
    var pais = document.getElementById("idPais").value
    if( nombre.length > 0 && pais.length > 0 && ciudad.length > 0 ) {
    document.getElementById('ciudad').innerHTML = ciudad;
    document.getElementById('pais').innerHTML = pais;
    document.getElementById('name').innerHTML = nombre;
    consultaAPI(ciudad, pais); 
    }
    if( nombre.length == 0 || pais.length == 0 || ciudad.length == 0 ) {
        Swal.fire({
          title: 'Faltan datos!',
          text: 'Necesita agregar todos los campos',
          icon: 'error',
          confirmButtonText: 'X'
        })
    }
}
function consultaAPI (idciudad, idpais)
{
    const appId ='f96c4bdc1c2b667a0b97073b916991ae';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${idciudad},${idpais}&appid=${appId}&lang=es`;

    fetch(url)
    .then((respuesta) => {
        return respuesta.json();
    })
    .then(datos => {
        verTiempo(datos);
        console.log(datos);
    })
    .catch((error) => {
        console.error(error);
    });  
}
function verTiempo(data) {
    var celcius = Math.round(parseFloat(data.main.temp) - 273.15);
    var max = Math.round(parseFloat(data.main.temp_max) - 273.15);
    var min = Math.round(parseFloat(data.main.temp_min) - 273.15);
    document.getElementById('tiempo').innerHTML = '<p> El tiempo que hace es '+celcius+'. Maximo '+max+' Minimo '+min+'</p>';
}