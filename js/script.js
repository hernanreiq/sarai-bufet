var cantidad_personas = document.getElementById('cantidad-personas');
var crear_menu = document.getElementById('crear-menu');
var cantidad_personas_cotizacion = document.getElementById('cantidad-personas-cotizacion');
var badge_monto_pagar = document.getElementById('badge-monto-pagar');
var fecha_hora = document.getElementById('fecha-hora');
var fecha_cotizacion = document.getElementById('fecha-cotizacion');
var contenedor_checkboxes_seleccionados = document.getElementById('contenedor-checkboxes-seleccionados');
var contenedor_cotizacion = document.getElementById('contenedor-cotizacion');
var contenedor_alertas = document.getElementById('contenedor-alertas');
var texto_alerta = document.getElementById('texto-alerta');
var menu;
var menu_personalizado = [];

/* 
    OBTENIENDO EL MENU QUE ESTA EN EL JSON 
*/

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

/* 
    CREACION DE LOS CHECKBOXES
*/

function crearCheckboxes(menu, cantidad_bandejas){
    var contenedor_checkboxes = document.getElementById('contenedor-checkboxes');
    for(var i = 0; i < cantidad_bandejas; i++){
        contenedor_checkboxes.innerHTML += `
        <tr>
        <td><label class="font-weight-bold mb-0"><input type="checkbox" value="${i}" onchange="agregarAlMenu(${i})"> ${menu[i].nombre}</label></td>
        </tr>
        `;
    }
}

/*
    ESTE BLOQUE DE CODIGO PERMITE AGREGAR LA COMIDA AL MENU 
    Y SI YA EL USUARIO LA TIENE AGREGADA EN EL MENU ENTONCES LA ELIMINA 
*/

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

/*
    OBTENER LOS VALORES DEL CHECKBOX 
*/

function obtenerValores(){
    if(cantidad_personas.value >= 25 && fecha_hora.value != '' && menu_personalizado.length > 0){
        /* OCULTAMOS LAS ALERTAS Y HACEMOS VISIBLE EL RESUMEN DE LA COTIZACION */
        contenedor_cotizacion.style.display = 'block';
        contenedor_alertas.style.display = "none";
        /* CALCULAMOS LO QUE SE VA A PAGAR POR EL MENU */
        var cantidad_opciones = menu_personalizado.length;
        var monto_pagar =  ((cantidad_opciones * 25) + 25) * Math.ceil(Math.abs(cantidad_personas.value)) + 500 + 1000;
        /* INSERTAMOS LOS RESULTADOS EN LA VENTANA EMERGENTE */
        cantidad_personas_cotizacion.innerText = Math.ceil(Math.abs(cantidad_personas.value)) + ' personas';
        badge_monto_pagar.innerText = 'RD$ ' + monto_pagar.toLocaleString('en-US');
        fecha_cotizacion.innerText = (fecha_hora.value).replace('T', ' a las ');
        imprimirOpcionesSeleccionadas();
    } else if(cantidad_personas.value <= 24){
        alertas('No cocinamos para menos de 25 personas, aumente la cantidad de invitados');
    } else if(menu_personalizado.length <= 0){
        alertas('Debe elegir al menos 1 opción para cocinar');
    } else if(fecha_hora.value == ''){
        alertas('Debe elegir la fecha y hora de la entrega de la comida');
    } else {
        alertas('No ha seleccionado nada...');
    }
} 

crear_menu.addEventListener('click', obtenerValores);

/* 
    IMPRIMIR TODAS LAS OPCIONES SELECCIONADAS 
*/

function imprimirOpcionesSeleccionadas(){
    contenedor_checkboxes_seleccionados.innerHTML = '';
    var cantidad_opciones = menu_personalizado.length;
    for(var i = 0; i < cantidad_opciones; i++){
        contenedor_checkboxes_seleccionados.innerHTML += `
        <tr>
            <td>${menu[menu_personalizado[i]].nombre}</td>
        </tr>
        `;
    }
}

/* 
    ALERTAS PARA EL USUARIO 
*/

function alertas(contenido_texto){
    contenedor_cotizacion.style.display = 'none';
    contenedor_alertas.style.display = "block";
    texto_alerta.innerText = contenido_texto;
}