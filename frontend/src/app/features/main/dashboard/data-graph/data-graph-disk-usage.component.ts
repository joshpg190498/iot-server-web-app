import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { DiskUsage } from 'src/app/core/interfaces/dashboard.interface';

@Component({
  selector: 'app-data-graph-disk-usage',
  templateUrl: './data-graph-disk-usage.component.html',
  styleUrls: ['./data-graph.component.scss']
})
export class DataGraphDiskUsageComponent implements OnChanges {
  @Input() diskUsageData: DiskUsage[] = [];
  multi: any[] = [];
  // options
  view: [number, number] = [400, 200]; // Valores iniciales
  legend: boolean = true;
  legendPosition: LegendPosition = LegendPosition.Right;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = false;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Fecha';
  yAxisLabel: string = 'Megabytes (MB)';
  timeline: boolean = false;

  colorScheme: Color = {
    name: "cool",
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
    group: ScaleType.Ordinal,
    selectable: true
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['diskUsageData']) {
      this.parseData()
    }
  }

  parseData() {
    const usedDiskTrend = this.diskUsageData.map((el: DiskUsage) => ({
      name: new Date(Number(el.collected_at_utc)).toLocaleString(),
      value: Number(el.used_disk)
    }));

    const freeDiskTrend = this.diskUsageData.map((el: DiskUsage) => ({
      name: new Date(Number(el.collected_at_utc)).toLocaleString(),
      value: Number(el.free_disk)
    }));

    const totalDiskTrend = this.diskUsageData.map((el: DiskUsage) => ({
      name: new Date(Number(el.collected_at_utc)).toLocaleString(),
      value: Number(el.total_disk)
    }));

    this.multi = [
      {
        name: 'Disco usado',
        series: usedDiskTrend
      },
      {
        name: 'Disco libre',
        series: freeDiskTrend
      },
      {
        name: 'Disco total',
        series: totalDiskTrend
      }
    ];
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
