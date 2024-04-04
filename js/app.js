
// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = []


cargarEventListeners();
function cargarEventListeners(){
    // Agregar curso al carrito
    listaCursos.addEventListener('click', agregarCurso);

    // Eliminar curso del carrito
    carrito.addEventListener('click',eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito = [] //Resetamos el arreglo
        limpiarHTML();
    })

}

// Funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito'))
    {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
}

// 
function leerDatosCurso(curso){
    // Creando objeto con informacion del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // Revisar si un curso ya esta en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)

    if(existe){
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }
            else{
                return curso;
            }
        })
        articulosCarrito = [...cursos];
    }
    else{
        // Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    
    
    console.log(articulosCarrito)
    carritoHTML();
}


function carritoHTML(){
    // Limpiando el html
    limpiarHTML();

    // Recorre el array y genera el HTML
    articulosCarrito.forEach(curso =>{
        const {imagen,titulo,precio,cantidad,id} = curso;
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${imagen}" alt="imagen-curso" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        contenedorCarrito.appendChild(row)
    })
}

function limpiarHTML(){
    // Forma lenta
    // contenedorCarrito.innerHTML = "";

    // Forma rapida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

function eliminarCurso(e){
    if( e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        // Eliminando el curso con el data-id del arreglo
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

        carritoHTML();
    }
}
