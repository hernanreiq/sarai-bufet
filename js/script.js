/* OBTENIENDO EL MENU QUE ESTA EN EL JSON */
var menu;
function ObtenerMenuJSON(){
    axios({
        method: 'GET',
        url: 'json/menu.json'
    }).then (res => {
        menu = res.data;
        crearCheckboxes(res.data, res.data.length);
    }).catch(err => {
        console.log('Hay un error con el menu.json\n', err);
    });
}
ObtenerMenuJSON();

/*OBTENER LOS VALORES DEL CHECKBOX */
var crear_menu = document.getElementById('crear-menu');

crear_menu.addEventListener('click', obtenerValores);

function obtenerValores(){
    var checkbox = document.getElementById('menu-checkbox-1');
    if(checkbox.checked){
        console.log('Está marcado', checkbox.checked);
    } else {
        console.log('No está marcado', checkbox.checked)
    }
}

function crearCheckboxes(menu, cantidad_bandejas){
    var contenedor_checkboxes = document.getElementById('contenedor-checkboxes');
    for(var i = 0; i < cantidad_bandejas; i++){
        contenedor_checkboxes.innerHTML += `
        <tr>
            <td><label class="font-weight-bold mb-0"><input type="checkbox" value="${i}" onchange="agregarAlMenu(${i})"> ${menu[i].nombre}</label><br></td>
        </tr>
        `;
    }
}

/*
    ESTE BLOQUE DE CODIGO PERMITE AGREGAR LA COMIDA AL MENU 
    Y SI YA EL USUARIO LA TIENE AGREGADA EN EL MENU ENTONCES LA ELIMINA 
*/
var menu_personalizado = [];

function agregarAlMenu(id_bandeja){
    if (menu_personalizado.includes(id_bandeja)){ // SI LA OPCION YA ESTÁ EN EL MENU, ENTONCES SE ELIMINA
        var index = menu_personalizado.indexOf(id_bandeja);
        if(index > -1){
            menu_personalizado.splice(index, 1);
        }
    } else { // SI LA OPCIÓN NO ESTÁ EN EL MENU, ENTONCES SE AGREGA
        menu_personalizado.push(id_bandeja);
    }
}