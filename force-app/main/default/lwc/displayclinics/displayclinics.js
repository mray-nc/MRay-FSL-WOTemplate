import { api, LightningElement,wire,track } from 'lwc';
import FetchAddress from "@salesforce/apex/FetchLocation.FetchAddress";
import FetchBillingAddress from "@salesforce/apex/FetchLocation.FetchBillingAddress";

export default class Displayclinics extends LightningElement {

    data=[];
    @api recordId;
    listView = 'hidden';
    @track options=[];
    mapMarkers=[];
    @api sobjectRecList=[];
    data1=[];


    @wire(FetchBillingAddress,{recordId: '$recordId'})
    wiredSprint1({error,data}){
        if(data)
        {
           this.data1=data;
           this.mapMarkers=this.data1.map(item => {
             return {location:{Latitude:item.BillingLatitude,Longitude:item.BillingLongitude},
                     title:'Billing Address',
                     type: 'Circle',
                     radius: 200,
                     strokeColor: '#0000FF',
                     strokeOpacity: 0.8,
                     strokeWeight: 2,
                    fillColor: '#0000FF',
                     fillOpacity: 0.35}
           })

            console.log('data1'+JSON.stringify(this.data1));
        }


    }
        


    @wire(FetchAddress,{recordId: '$recordId',sobjectRecList: '$sobjectRecList'}) 
        wiredSprint({error,data}){
            if(data)
            {
                this.data=data;
                console.log('data' +JSON.stringify(data));
                
           this.mapMarkers = this.data.map(item => {
               return {location:{Latitude:item.latitude1,Longitude:item.longitude1},
                       title:item.Name1}
           })

         /*  this.options=this.data.map(item =>{
               return{label:item.Addressval,value:item.Addressval}
           }) */
          console.log('mapMarkers'+JSON.stringify(this.mapMarkers));


            }
            else
            {
               this.error=error;
            }
      
          }
         


}