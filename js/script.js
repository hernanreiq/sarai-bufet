const modal_body = document.getElementById('modal-body');

/* OBTENIENDO EL MENU QUE ESTA EN EL JSON */
function ObtenerMenuJSON(){
    axios({
        method: 'GET',
        url: 'json/menu.json'
    }).then (res => {
        const menu = res.data;
    }).catch(err => {
        console.log('Hay un error con el menu.json\n', err);
    });
}

ObtenerMenuJSON();

function borrarOpcion(opcion){
    document.getElementById(opcion).parentElement.replaceWith('');
    console.log('ID:', opcion, 'fue borrado!');
}

function masBandejas(){
    document.getElementById('contenedor-inputs').innerHTML += `
        Hola    <br>
    `;
}
var mas_bandejas = document.getElementById('mas-bandejas');

mas_bandejas.addEventListener('click', masBandejas);