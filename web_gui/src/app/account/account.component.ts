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
  rewardTabSelected: string;
  charts: object;
  chart: Chart;

  constructor(private service: ApiService) {
    this.miningTabSelected = 'workers';
    this.rewardTabSelected = 'payments';
  }

  ngOnInit() {

    this.service.getDashboard().subscribe(data => {
      this.charts = data['charts'];
    });

    this.chart = new Chart({
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
        gridLineColor: '#0c68cc',
        gridLineWidth: 1,
        tickWidth: 1,
        tickColor: '#0c68cc',
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
        gridLineColor: '#0c68cc',
        lineColor: '#0c68cc',
        lineWidth: 1,
        tickWidth: 1,
        tickLength: 10,
        tickColor: '#0c68cc',
        labels: {
          style: {
            color: '#fff',
            fontSize: '14px'
          },
          format: '{value:%d %b}'
        },
        minPadding: 0,
        maxPadding: 0,
        minRange: 86400000,
        // tickInterval: 86400000,
        minTickInterval: 3600000,
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
        // pointFormat: '<div style="background-color: {series.color}; color: white; border-radius: 3px; padding: 0 5px;">{point.y} {point.x:%d %b, %H:%M GMT}</div>',
        pointFormat: '<div style="background-color: rgba(49, 155, 251, 0.55); font-size: 12px; color: white; border-radius: 5px; padding: 0 5px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16)">{point.y} {point.x:%d %b, %H:%M GMT}</div>',
        shared: true,
        padding: 0
      },

      plotOptions: {
        area: {
          color: '#319bfb',
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
              [0, 'rgba(49, 155, 251, 0.55)'],
              [1, 'rgba(49, 155, 251, 0.1)']
            ]
          },
          marker: {
            enabled: true,
            radius: 4,
            states: {
              hover: {
                fillColor: '#319bfb',
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
          data: [
            [new Date('2019-02-21T15:40:51.468Z').getTime(), 415600],
            [new Date('2019-03-21T15:40:51.468Z').getTime(), 615600],
            [new Date('2019-04-21T15:40:51.468Z').getTime(), 315600],
          ]
        }
      ]
    });

  }

  getInfoWallet() {
    this.service.getMiner(this.walletAddress).subscribe(data => {
      this.walletData = data;
    });
  }

}
