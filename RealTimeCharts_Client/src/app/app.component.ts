import { Component , OnInit } from '@angular/core';
import { SignalRService } from './services/signal-r.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public chartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public chartLabels: string[] = ['Real time data for the chart'];
  public chartType: string = 'bar';
  public chartLegend: boolean = true;
  public colors: any[] = [{ backgroundColor: '#5491DA' }, { backgroundColor: '#E74C3C' }, { backgroundColor: '#82E0AA' }, { backgroundColor: '#E5E7E9' }]


  constructor(public signalRService: SignalRService, private http: HttpClient) 
  { }

  ngOnInit() {
    // start connection
    this.signalRService.startConnection();
    // call function that subscribe to the server event 
    this.signalRService.addTransferChartDataListener();  
    
    
    // call function that subscribe to the server event 
    this.signalRService.addBroadcastDataListener();

    // call the server 
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.http.get('https://localhost:44316/api/chart')
      .subscribe(res =>
      {
        console.log("startHttpRequest");
        console.log(res);
      });
  }

  public sendDataToServer = (event) => 
  {
    console.log("sendDataToServer" + this.signalRService.sendData);
    console.log(event);
    // invoke the server endppoint 
     this.signalRService.broadcastData();
  }
}
