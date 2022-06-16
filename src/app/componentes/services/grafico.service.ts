import { Injectable } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {

  constructor() { }
  crearGraficoBarras(param1:any, param2:any, titulo:string, xAxisTitle:string, yAxisTitle:string, sufijo:string)
  {
    return new Chart({
      chart:{
        type:'bar'
      },
      title:{
        text:titulo
      },
      xAxis:{
        categories:param1,
        title:{
          text:xAxisTitle
        }
      },
      yAxis:{
        min:0,
        title:{
          text:yAxisTitle,
          align:'high'
        },
        labels:{
          overflow:'justify'
        }
      },
      tooltip: {
        valueSuffix: ' '+sufijo
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          shadow: true
      },
      credits: {
          enabled: false
      },
      series: [
        {
          type:'bar',
          data: param2,
        }
      ]
    });
  }
}
