import { LightningElement,wire,api,track } from 'lwc';
import FetchAddress from "@salesforce/apex/FetchLocation.FetchAddress";

export default class Displaytimeslots extends LightningElement {
     title = "Welcome to Lightning Web Components!";

  showFeatures = true;

  /**
   * Getter for the features property
   */
 handleClick(){
   console.log("testing");
 }

    @track address;
    @api recordId;

    @api serviceTIdfromJs;
     
     timeslot=[];
      @api sobjectRecList=[];
     

    @wire(FetchAddress,{recordId: '$recordId',sobjectRecList: '$sobjectRecList'}) 
        wiredSprint({error,data}){
            if(data)
            {
                this.address=data;
                console.log('data' +JSON.stringify(data));

               console.log('timeslot'+JSON.stringify(this.timeslot));
            }

             else
            {
               this.error=error;
            }

        }


            handleClick2(event){
            
            this.template.querySelectorAll('.selectCard').forEach((ele)=>{
              if(!event.currentTarget.classList.contains('blue-br')){

                ele.classList.remove('blue-br');
              }

            })


        
        //   this.template.querySelectorAll('.selectCard').forEach(el=>el.classList.remove('dynamicCSS'));
           event.currentTarget.classList.toggle('blue-br')


            console.log('address'+event.currentTarget.id);
            let text=event.currentTarget.id;
            let myarray=text.split("-");
            this.serviceTIdfromJs=myarray[0];

            console.log('serviceId'+this.serviceTIdfromJs);
        }

}