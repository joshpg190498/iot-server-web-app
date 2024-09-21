import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RamUsage } from 'src/app/core/interfaces/dashboard.interface';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexLegend,
  ApexTooltip,
  ApexDataLabels,
  ApexFill,
  ApexStroke
} from 'ng-apexcharts';

@Component({
  selector: 'app-data-graph-ram-usage',
  templateUrl: './data-graph-ram-usage.component.html',
  styleUrls: ['./data-graph.component.scss']
})
export class DataGraphRamUsageComponent implements OnChanges {
  @Input() ramUsageData: RamUsage[] = [];
  public chartSeries: ApexAxisChartSeries = [];
  public chartOptions: any;
  private maxPoints: number = 50; // Máximo número de puntos a mostrar en el gráfico

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ramUsageData']) {
      this.parseData();
    }
  }

  ngOnInit() {
    this.initializeChartOptions();
  }

  initializeChartOptions() {
    this.chartOptions = {
      chart: {
        type: 'area', // Cambiado a "area" para gráfico de área
        stacked: true,
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000 // Velocidad de la animación de actualización
          }
        }
      },
      xaxis: {
        type: 'datetime', // Se utiliza "datetime" para mejor manejo de fechas
        labels: {
          format: 'dd/MM/yy HH:mm:ss',
          show: false
        }
      },
      yaxis: {
        title: {
          text: 'Megabytes (MB)'
        }
      },
      dataLabels: {
        enabled: false // Se deshabilitan las etiquetas dentro del área
      },
      stroke: {
        curve: 'smooth',
        width: 2 // Grosor de las líneas del área
      },
      fill: {
        type: 'gradient', // Rellena el área con un gradiente
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
        }
      },
      legend: {
        show: true,
        position: 'bottom'
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm:ss'
        }
      },
      grid: {
        show: true // Muestra las líneas de la cuadrícula
      },
      /* annotations: {
        yaxis: [
          {
            y: 100,
            borderColor: '#E44D25',
            label: {
              text: 'Límite',
              style: {
                color: '#fff',
                background: '#E44D25'
              }
            }
          }
        ]
      } */
    };
  }

  parseData() {
    // Convierto los datos de uso y RAM libre en dos series de datos para el gráfico
    const usedRamTrend = this.ramUsageData.map((el: RamUsage) => ({
      x: new Date(Number(el.collected_at_utc)).getTime(), // timestamp para el eje X
      y: Number(el.used_ram) // Porcentaje de RAM usada
    }));

    const freeRamTrend = this.ramUsageData.map((el: RamUsage) => ({
      x: new Date(Number(el.collected_at_utc)).getTime(), // timestamp para el eje X
      y: Number(el.free_ram) // Porcentaje de RAM libre
    }));

    this.chartSeries = [
      {
        name: 'RAM Usada',
        data: usedRamTrend
      },
      {
        name: 'RAM Libre',
        data: freeRamTrend
      }
    ];
  }

  updateRealtimeData(newData: RamUsage) {
    const newPointUsed = {
      x: new Date(Number(newData.collected_at_utc)).getTime(),
      y: (Number(newData.used_ram) / (Number(newData.used_ram) + Number(newData.free_ram))) * 100
    };

    const newPointFree = {
      x: new Date(Number(newData.collected_at_utc)).getTime(),
      y: (Number(newData.free_ram) / (Number(newData.used_ram) + Number(newData.free_ram))) * 100
    };

    let currentUsedData = this.chartSeries[0].data as any[];
    let currentFreeData = this.chartSeries[1].data as any[];

    if (currentUsedData.length >= this.maxPoints) {
      currentUsedData.shift();
      currentFreeData.shift();
    }

    currentUsedData.push(newPointUsed);
    currentFreeData.push(newPointFree);

    this.chartSeries = [
      {
        name: 'RAM Usada',
        data: currentUsedData
      },
      {
        name: 'RAM Libre',
        data: currentFreeData
      }
    ];
  }
}
