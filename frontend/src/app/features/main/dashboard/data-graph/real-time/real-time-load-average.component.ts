import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core'
import { DatePipe } from '@angular/common'
import { LoadAverage } from 'src/app/core/interfaces/dashboard.interface'
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
  selector: 'app-real-time-graph-load-average',
  templateUrl: './real-time-load-average.component.html',
  styleUrls: ['../data-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RealTimeLoadAverageComponent implements OnChanges {
  @Input() loadAverageData: LoadAverage[] = []
  public chartSeries: ApexAxisChartSeries = []
  public chartOptions: any
  @Input() deviceId: string = '' 

  constructor(
    private datePipe: DatePipe
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['loadAverageData'] || changes['deviceId']) {
      this.parseData();
    }
  }

  ngOnInit() {
    this.initializeChartOptions();
  }

  initializeChartOptions() {
    this.chartOptions = {
      chart: {
        type: 'line',
        height: 240,
width: 445,
        animations: {
          enabled: false,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        zoom: {
          enabled: false
        },
        toolbar: {
          show: true
        }
      },
      xaxis: {
        type: 'datetime', 
        labels: {
          format: 'dd-MM-yy HH:mm:ss',
          show: true 
        }
      },
      yaxis: {
        title: {
          text: 'Load Average'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      legend: {
        show: true,
        position: 'bottom'
      },
      tooltip: {
        x: {
          format: 'dd-MM-yy HH:mm:ss'
        }
      },
      grid: {
        show: true
      }
    };
  }

  parseData() {
    const series1m: { x: number, y: number }[] = [];
    const series5m: { x: number, y: number }[] = [];
    const series15m: { x: number, y: number }[] = [];

    this.loadAverageData
    .filter(({ id_device }) => id_device === this.deviceId)
    .forEach(({ collected_at_utc, load_average_1m, load_average_5m, load_average_15m }: LoadAverage) => {
      const timestamp = collected_at_utc ? new Date(Number(collected_at_utc)).getTime() : null;
      if (timestamp) {
        if (load_average_1m !== undefined) {
          series1m.push({ x: timestamp, y: Number(load_average_1m) });
        }
        if (load_average_5m !== undefined) {
          series5m.push({ x: timestamp, y: Number(load_average_5m) });
        }
        if (load_average_15m !== undefined) {
          series15m.push({ x: timestamp, y: Number(load_average_15m) });
        }
      }
    });

    this.chartSeries = [
      {
        name: 'Load Average 1m',
        data: series1m
      },
      {
        name: 'Load Average 5m',
        data: series5m
      },
      {
        name: 'Load Average 15m',
        data: series15m
      }
    ];
  }
}
