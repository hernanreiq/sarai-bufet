/* OBTENIENDO EL MENU QUE ESTA EN EL JSON */
var menu;
function ObtenerMenuJSON(){
    axios({
        method: 'GET',
        url: 'json/menu.json'
    }).then (res => {
        menu = res.data;
        //CUANDO SE OBTENGA EL MENÚ, SE CREARÁ EL PRIMER INPUT
        masBandejas();
    }).catch(err => {
        console.log('Hay un error con el menu.json\n', err);
    });
}
ObtenerMenuJSON();

var inputs_borrados = [];
var cantidad_input = 0;

function borrarOpcion(opcion){
    inputs_borrados.push(opcion);
    document.getElementById(opcion).parentElement.replaceWith('');
}

/* 
    EN ESTE BLOQUE DE CODIGO SE VAN A CREAR LOS INPUTS PARA LAS OPCIONES O BANDEJAS
*/
var mas_bandejas = document.getElementById('mas-bandejas');
mas_bandejas.addEventListener('click', masBandejas);

function masBandejas(){ 
    if (inputs_borrados.length > 0){
        var id_input = inputs_borrados[0];
        inputs_borrados.shift();
    } else {
        cantidad_input += 1;
        var id_input = 'inputGroup-' + cantidad_input;
    }
    creadorInputs(id_input);
}

function creadorInputs(id_input){
    document.getElementById('contenedor-inputs').innerHTML += `
    <div class="input-group my-3">
        <div class="input-group-prepend">
            <label class="input-group-text font-weight-bold" for="${id_input}">Opciones</label>
        </div>
        <select class="custom-select" id="${id_input}">
            <option selected>Elegir bandeja</option>
        </select>
        <button class="btn btn-danger border" onclick="borrarOpcion('${id_input}')">
            <i class="far fa-trash-alt"></i>
        </button>
    </div>
    `;
    for (var i = 0; i < menu.length; i++){
        document.getElementById(`${id_input}`).innerHTML += `
            <option value="${i}">${menu[i].nombre}</option>
        `;
    }
}