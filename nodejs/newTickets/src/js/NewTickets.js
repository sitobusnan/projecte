import { initializeApp } from "firebase/app";




export class Tickets {
    constructor(props) {
        //que solo reciba un objecto en vez de los 5 argumentos
        // destructuracion
        const { id, titulo, descripcion, assignedId, assetId } = props;
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.assignedId = assignedId;
        this.assetId = assetId;
        //esto lo coge del metodo del constructor: nose pasa por props.
        this.created = this.getDate();
        this.isDone = false;
        // this.actualizado = this.getDate();
    }
    getDate() {
        let date = new Date();
        return date.toDateString();


    }
}
export class ListTickets {
    ticket;
    tickets;
    data;
    constructor() {
        this.getInformation().then;
    }

    async getInformation() {
        try {
            this.data = (await fetch('https://jsuite-710e7-default-rtdb.europe-west1.firebasedatabase.app/tickets.json')).json();
            console.log(this.data, "esto es data");
            
            return this.data;
        }
        catch (e) {
            console.log(e);
            console.log("error al mostrar los tickets.");
            return null;
        }
    
    }
    async createTicket(ticket) {
        // var id = this.getLastId();
        try {
          
            // let id = this.data.length > 0 ? this.data.at(-1).id : 0;

            this.ticket = (await fetch('https://jsuite-710e7-default-rtdb.europe-west1.firebasedatabase.app/tickets.json',
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(ticket)
                })
            ).json();
            console.log(this.ticket);
        }
        catch (error) { 
            // console.log("no furrula");
            console.log(error) 
                
            
        }
    }
    //  getLastId() {

    //     let id = this.data.length > 0 ? this.data.at(-1).id : 0;
    //     console.log(id);
    //     return id;
    // }

}    

