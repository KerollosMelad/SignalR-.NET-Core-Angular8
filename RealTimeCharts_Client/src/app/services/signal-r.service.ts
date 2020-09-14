import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ChartModel } from '../_interfaces/ChartModel';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }

  public data: ChartModel[];
  public sendData : number = 15;
  // connection
  private hubConnection: signalR.HubConnection;
  public startConnection()
   {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:44316/chart')
                            .build();
    // start connection
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferChartDataListener = () => {
    // subscribe to the event transferchardata
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
     // console.log(data);
    });
  }
   // send data to our Hub endpoint 
   public broadcastData = () => {
     console.log("broadcastData" + this.sendData);
    this.hubConnection.invoke('broadcastdata', this.sendData)
    .catch(err => console.log(err));
  }
 
  public addBroadcastDataListener = () => {
    // subscribe to the event
    this.hubConnection.on('broadcastdata', (data) => {
      console.log("broadcastdata recieved" + data);
    });
  }
}
