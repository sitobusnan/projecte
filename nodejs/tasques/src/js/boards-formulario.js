import { Tickets } from '../../../tickets/src/js/Tickets';
import{ListTickets} from '../../../tickets/src/js/Tickets';
import{ListBoards} from './Board';
var listBoard= new ListBoards;
var listTicket= new ListTickets;

function optionTicket(){
    const ticketOption=listTicket.getLocalStorage();
    console.log("oeoeoe",ticketOption);
    console.log(ticketOption);
    var option="";
    for(let i=0; i<ticketOption.length;i++){
        
        option += `<option value=${ticketOption[i].id}>${ticketOption[i].titulo}</option>`;

    }
    console.log(option);

    return option;
    

}

export function refreshTicketX(){
    let oldTasca=document.getElementById('contenedorTotal');
    document.body.remove(oldTasca);
    createTasques();


}
function actualizaTicket(){
    let sumbit =document.getElementById('subir');
    sumbit.addEventListener('click', event =>{
        refreshTicketX(listTicket.getLocalStorage());
    })
}


// ${ opcion=optionTicket(ticketOption,long)}
// var opcion=optionTicket(ticketOption,long);
export function createTasques(){
    
    var htmlTasques=`
    <div id="contenedorTotal">

    <form action="boards.js" method="post">

        <label for="idUsiario">Nombre de Usuario</label> <br>
        <input type="text" name="idUsuario" id="idUsuario"> <br> <br>
        <label for="descripcion">Descripcion de la Tascaa</label> <br>
        <input type="text" name="descripcion" id="descripcion"> <br> <br>
        <select name='incidencia'>
        ${optionTicket()}
        
        </select> 
        
        <input type="submit">


    </form>
    
    </div>
    <h3>Tasques</h3>
    <div id="contenedorBotones">
        <button type='submit' id='zoom'>Veure</button>
        <button type='submit' id='subir'>Crear Tasca</button>
        <button type='reset' id='cancel'>Eliminar</button>
    </div>
`
let div2 = document.createElement('div');
div2.innerHTML=htmlTasques;
document.body.append(div2);
actualizaTicket();

}

