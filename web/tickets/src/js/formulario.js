import { Tickets } from "./Tickets";
import { AssetsList } from "./assets-list-class";
import { Asset } from "./asset-class";
import { UsuarisList } from "./usuaris-list-class";
import { ListTickets } from "./Tickets";

var asset = new Asset
var listAsset = new AssetsList();
var userList = new UsuarisList();
//manejador 
var ticketList = new ListTickets();

//funcion que reciba la lista de ticket y esta se pone
//dentro de un div y este div de destruye y contruye
//para que este actualizada
function listRefresh(list) {
    console.log(list);
    //la lista vieja
    let oldList = document.getElementById('lista');
    document.body.removeChild(oldList);

    let oldDivCabecera = document.getElementById('cabecera');
    document.body.removeChild(oldDivCabecera);
    //div  del titulo
    let divCabecera = document.createElement('div');
    divCabecera.setAttribute('id', 'cabecera');
    divCabecera.setAttribute('class', 'divCabecera');

    //divs de los titulos
    let divId = document.createElement('div');
    divId.innerHTML = 'ID';

    let divDescription = document.createElement('div');
    divDescription.innerHTML = 'Descripció';
    let divTitol = document.createElement('div');
    divTitol.innerHTML = 'Titol';
    let divAssignacio = document.createElement('div');
    divAssignacio.innerHTML = 'Assignació';

    let divComponent = document.createElement('div');
    divComponent.innerHTML = 'Component';
    let divCreacio = document.createElement('div');
    divCreacio.innerHTML = 'Creació';
    let divFet = document.createElement('div');
    divFet.innerHTML = 'Fet';
    let divVeure = document.createElement('div');
    divVeure.innerHTML = 'Veure';

    //la lista nueva
    const newList = document.createElement('div');
    newList.setAttribute('id', 'lista');
    //crearmela tabla
    //añadir a cada elemento a un th
    list.forEach(element => {
        let checkMostra = document.createElement('input');
        checkMostra.setAttribute('type', 'checkbox');
        checkMostra.setAttribute('class', 'lista__check');

        checkMostra.setAttribute('id', 'check' + element.id);
        checkMostra.checked = element.isDone;
        checkMostra.addEventListener('click', event => {
                ticketList.updateTicket(element.id, checkMostra.checked);
            })
            //creamos botoninfo
        let butInfo = document.createElement('button');
        butInfo.setAttribute('class', "btn btn-info");
        butInfo.setAttribute('id', 'butInfo' + element.id);
        butInfo.innerHTML = "Veure";
        butInfo.addEventListener('click', event => { 
            veureTicket(element.id);
        })

        let butBorrar = document.createElement('button');
        butBorrar.setAttribute('class', "btn btn-danger");
        butBorrar.setAttribute('id', 'Borrar' + element.id);
        butBorrar.innerHTML = "borrar";
        butBorrar.addEventListener('click', event => {
            deleteButtonAction(element.id);


            })
            //crear un addEventlistenner para este boton.
            //creamos el div
        let line = document.createElement('div');
        line.setAttribute('class', 'lista__line');
        line.setAttribute('id', 'line' + element.id);
        line.innerHTML = `<div class=line__info>${element.id}</div>
        <div class="line__info  line--pequeños" >${element.titulo}</div>
        <div class="line__info">${element.descripcion}</div>
        <div class="line__info">${element.assignedId}</div>
        <div class="line__info">${element.assetId}</div>
        <div class="line__info">${element.created}</div>
        `;
        line.appendChild(checkMostra);
        line.appendChild(butInfo);
        line.appendChild(butBorrar);
        newList.appendChild(line);
    });

    divCabecera.appendChild(divId);
    divCabecera.appendChild(divTitol);
    divCabecera.appendChild(divDescription);
    divCabecera.appendChild(divAssignacio);
    divCabecera.appendChild(divComponent);

    divCabecera.appendChild(divCreacio);
    divCabecera.appendChild(divFet);
    document.body.appendChild(divCabecera);
    document.body.append(newList);
}
function filtersearch() { 
    let buscador = document.getElementById('filtrar');
    buscador.addEventListener('click', event => { 
       
        let mostrar = document.getElementById('textSearch');
        mostrar.style.display = 'block';

    })


}

function deleteButtonAction(id) {
    ticketList.deletedTicket(id);
    listRefresh(ticketList.getLocalStorage());   //list refresh
}

function usersOptions() {
    const users = userList.usuaris;
    let option = "";
    for (let i of users) {
        option += `<option value =${i.id_usuari}> ${i.username} </option>`;
    }
    return option;
}
function assetsOptions() {
    var assets = listAsset.assets;
    let option = "";
    for (let i of assets) {
        option += `<option value =${i.id_asset}>${i.model}</option>`;
    }
    return option;
}
function pendingTicket() {
    let butpending = document.getElementById('pendientes');
    butpending.addEventListener('click', event => {
        event.preventDefault();
        let lista = ticketList.getLocalStorage();
        let filteredList = lista.filter(element => {
            return element.isDone == false;
        })
        listRefresh(filteredList);
    })
}

function onSubmit() {
    const button = document.getElementById('addTicketButton');
    button.addEventListener("click", event => {
        event.preventDefault();
        //ya sabe el id que le voy a dar
        let ticketId = ticketList.getLastId() + 1;
        let ticketName = document.getElementById('titulo').value;
        let ticketDesc = document.getElementById('description').value;
        let ticketAssigned = document.getElementById('tec').value;
        let ticketAsset = document.getElementById('assets').value;
        const values = {
            //ticketId: ticketId,
            id: ticketId,
            titulo: ticketName,
            descripcion: ticketDesc,
            assignedId: ticketAssigned,
            assetId: ticketAsset
        }
        var ticket = new Tickets(values);
        ticketList.postTicket(ticket);
        console.log(ticketList.getLocalStorage);
        console.log(ticket);
        listRefresh(ticketList.getLocalStorage());
    })
}

function closeTicket(){ 
    let cerrarTicket = document.getElementById('cerrarInfoTicket');
    cerrarTicket.addEventListener('click', event => { 
        var cabeceraOcultar = document.getElementById('infoTicket');
        cabeceraOcultar.style.display = 'none';
        
    })
}

export function creacionForm() {

        var html = `
        <div class='container'>
            <div class='inci'> Incidències</div>
            <form action="" class="form-horizontal" >
                <div class="form-group">
                    <label for="titulo">Tittle</label>
                    <input  class="form-control" type="text" id='titulo' name="titulo">
                    <label for="descripcion">Description</label>
                    <input class="form-control" type="text" id='description' name="description">
                    <label> Tècnic</label>
                    <select class="form-control" name="assignation" id="tec">
                        ${usersOptions()}
                    </select>
                    <label>Component Incidència</label>
                    <select  class="form-control" name="assets" id="assets">
                        ${assetsOptions()}
                    </select>
                    <button class="btn btn-success" type="submit" id="addTicketButton">Crear Incidencia</button>
                    <button class="btn btn-danger" type="reset" >Cancelar Incidencia</button>
                    <button  class="btn btn-primary" type="submit" id="pendientes">Mostrar solamente tareas pendientes.</button>
                    <button class="btn btn-info" type="submit" id="mostrarIncidencias"> Mostrar lista de incidencias</button>
                    <button class="btn btn-warning" type="submit" id="filtrar">Buscar</button>
                    <div id= "buscador">
                        <input class="form-control" type="text" id="textSearch" placeholder="escriu el que vols buscar"
                        <button id='buttonSearch'> buscar</buscar>
                    </div>
                </div>
            </form>
        </div>
    
    `
        let div = document.createElement('div');
        div.innerHTML = html;
        document.body.append(div);
    
        let containerCabecera = document.createElement('div');
        containerCabecera.setAttribute('id', 'cabecera');
        document.body.append(containerCabecera);
    
        let listContainer = document.createElement('div');
        listContainer.setAttribute('id', 'lista');
        document.body.append(listContainer);
        listRefresh(ticketList.getLocalStorage());
         
        let mostrar = document.getElementById('textSearch');
        mostrar.style.display = 'none';
        //capturamos el contenido
        // var lista = document.getElementById('lista').childNodes;
        //llamamos a la funcion del checked
        pendingTicket();
        onSubmit();
        filtersearch();
}
export function veureTicket(id) { 
    var cabeceraOcultar = document.getElementById('cabecera');
    cabeceraOcultar.style.display = 'none';
    var listaOcultar = document.getElementById('lista');
    listaOcultar.style.display = 'none';

    var ticket = `
    <div id='infoTicket' class="infoTicket">
        <div>Informació Ticket </div>
    <div>
        
        <button class="btn btn-danger" id="cerrarInfoTicket"> cerrar</button>
    </div>

    </div>
`


    let divTicket = document.createElement('div');
    divTicket.innerHTML = ticket;
    document.body.append(divTicket);

    let ticketInfo = document.createElement('div');
    ticketInfo.setAttribute('id', 'ticketInfo');
    document.body.append(ticketInfo);

    closeTicket();
}