import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ApiService } from '../_helpers/services/api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  walletAddress: string;
  walletData: any;
  miningTabSelected: string;
  charts = {};
  chart: Chart;
  workersList: any[] = [];

  static drawChart(chartData, chartColorSeriesRGB): Chart {
    const chartColor = '#0c68cc';
    const chartColorSeries = 'rgb(' + chartColorSeriesRGB + ')';
    let pointStyle = 'background-color: rgba(' + chartColorSeriesRGB + ', 0.55);';
    pointStyle = pointStyle + ' font-size: 12px;';
    pointStyle = pointStyle + ' color: white;';
    pointStyle = pointStyle + ' border-radius: 5px;';
    pointStyle = pointStyle + ' padding: 0 5px;';
    pointStyle = pointStyle + ' box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16)';
    const point = '<div style="' + pointStyle + '">{point.y} {point.x:%d %b, %H:%M GMT}</div>';

    return new Chart({
      title: {text: ''},
      credits: {enabled: false},
      exporting: {enabled: false},
      legend: {enabled: false},
      chart: {
        type: 'line',
        backgroundColor: 'transparent',
        height: 160,
        zoomType: null
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
            fontSize: '14px'
          },
          format: '{value} '
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
    this.miningTabSelected = 'total';
  }

  ngOnInit() {
  }

  getInfoWallet() {
    this.service.getMiner(this.walletAddress).subscribe(data => {
      this.workersList = [];
      this.charts = {};
      this.walletData = data;
      const localInfo = data['workers']['hasrate_chart'];

      localInfo.forEach(item => {
        const itemDate = new Date(item[0]).getTime();
        if ( !this.charts['total'] ) {
          this.charts['total'] = [];
        }
        this.charts['total'].push([itemDate, parseFloat(item[1][item[1].length - 1])]);
        let name = '';
        let amount = '';
        for (let i = 0; i < item[1].length - 2; i++) {
          if (i % 2 === 0) {
            name = item[1][i].split(':')[1];
          } else {
            amount = item[1][i];
            if ( !this.charts[name] ) {
              this.charts[name] = [];
            }
            this.charts[name].push([itemDate, parseFloat(amount)]);
          }
        }
      });
      this.setChart('total');
      let nameWorker = '';
      let amountWorker = '';
      for (let i = 0; i < localInfo[0][1].length - 2; i++) {
        if (i % 2 === 0) {
          nameWorker = localInfo[0][1][i].split(':')[1];
        } else {
          amountWorker = localInfo[0][1][i];
          this.workersList.push({name: nameWorker, amount: amountWorker});
        }
      }
    });
  }

  setChart(name) {
    this.miningTabSelected = name;
    this.chart = AccountComponent.drawChart(this.charts[this.miningTabSelected], '100, 221, 226');
  }

}
