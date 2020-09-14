using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using RealTimeCharts_Server.Models;

namespace RealTimeCharts_Server.HubConfig
{
    
    public class ChartHub: Hub
    {
        //This BroadcastChartData method will receive the message from the client
        //and then broadcast that same message to all the clients
        //that listen on the bradcastchratdata event.
        [HubMethodName("broadcastchartdata")]
        public async Task broadcastchartdata(List<ChartModel> data)
        {
            await Clients.All.SendAsync("broadcastchartdata", data);
        }
        public async Task broadcastdata(int data)
        {
            await Clients.All.SendAsync("broadcastdata", data);
        }
        
    }
}
