import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ApiService } from '../_helpers/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  activeChartTab = 'hashrate';
  activeTableTab = 'blocks';
  network;
  pool;
  charts;
  chartsData = {
    hashRate: [],
    difficulty: [],
    effort: []
  };
  hashRateChart: Chart;
  difficultyChart: Chart;
  effortChart: Chart;
  blocks;
  payments;
  blocksLimit: number;

  static drawChart(chartData, chartColorSeriesRGB): Chart {
    const chartColor = '#0c68cc';
    const chartColorSeries = 'rgb(' + chartColorSeriesRGB + ')';
    let pointStyle = 'background-color: rgba(' + chartColorSeriesRGB + ', 0.55);';
    pointStyle = pointStyle + ' font-size: 12px;';
    pointStyle = pointStyle + ' color: white;';
    pointStyle = pointStyle + ' border-radius: 5px;';
    pointStyle = pointStyle + ' padding: 2px 7px;';
    pointStyle = pointStyle + ' box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);';
    pointStyle = pointStyle + ' font-weight: 100;';
    const point = '<div style="' + pointStyle + '"><b>{point.y}</b> {point.x:%d %b, %H:%M GMT}</div>';

    return new Chart({
      title: {text: ''},
      credits: {enabled: false},
      exporting: {enabled: false},
      legend: {enabled: false},
      chart: {
        type: 'line',
        backgroundColor: 'transparent',
        height: 200,
        zoomType: null,
        style: {
          fontFamily: 'Helvetica'
        }
      },

      yAxis: {
        min: 0,
        tickAmount: 3,
        title: {
          text: ''
        },
        gridLineColor: chartColor,
        gridLineWidth: 1,
        tickWidth: 1,
        tickColor: chartColor,
        labels: {
          style: {
            color: '#fff',
            fontSize: '14px',
          },
          // format: '{value} '
        }
      },

      xAxis: {
        type: 'datetime',
        gridLineColor: chartColor,
        lineColor: chartColor,
        lineWidth: 1,
        tickWidth: 1,
        tickLength: 10,
        tickColor: chartColor,
        labels: {
          style: {
            color: '#fff',
            fontSize: '14px'
          },
          format: '{value:%d %b}'
        },
        minPadding: 0,
        maxPadding: 0,
        // minRange: 86400000,
        // tickInterval: 86400000,
        minTickInterval: 60000,
        endOnTick: true,
      },

      tooltip: {
        borderWidth: 0,
        shadow: false,
        backgroundColor: 'transparent',
        crosshairs: true,
        useHTML: true,
        headerFormat: '',
        footerFormat: '',

        xDateFormat: '%b %Y',
        pointFormat: point,
        shared: true,
        padding: 0
      },

      plotOptions: {
        area: {
          color: chartColorSeries,
          shadow: true,
          states: {
            hover: {
              lineWidthPlus: 0
            },
          },
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, 'rgba(' + chartColorSeriesRGB + ', 0.55)'],
              [1, 'rgba(' + chartColorSeriesRGB + ', 0.1)']
            ]
          },
          marker: {
            enabled: true,
            radius: 4,
            states: {
              hover: {
                fillColor: chartColorSeries,
                radiusPlus: 0,
                lineWidthPlus: 2
              },
            }
          },
          lineWidth: 2,
          threshold: null
        },
        series: {
          states: {
            hover: {
              halo: {
                size: 0
              }
            }
          }
        }
      },

      series: [
        {
          type: 'area',
          data: chartData
        }
      ]
    });
  }

  constructor(private service: ApiService) {
    this.blocksLimit = 10;
  }

  ngOnInit() {

    this.service.getDashboard().subscribe(data => {
      this.network = data['network'];
      this.pool = data['pool'];
      this.charts = data['pool']['stats'];

      this.charts.forEach(item => {
        const itemDate = new Date(item[0]).getTime();
        this.chartsData.hashRate.unshift([itemDate, parseFloat(item[1][3])]);
        this.chartsData.difficulty.unshift([itemDate, parseFloat(item[1][1])]);
        this.chartsData.effort.unshift([itemDate, parseFloat(item[1][5])]);
      });

      this.hashRateChart = DashboardComponent.drawChart(this.chartsData.hashRate, '100, 221, 226');
      this.difficultyChart = DashboardComponent.drawChart(this.chartsData.difficulty, '49, 155, 251');
      this.effortChart = DashboardComponent.drawChart(this.chartsData.effort, '100, 221, 226');
    });

    this.service.getBlocks().subscribe(data => {
      this.blocks = data;
    });

  }

}
