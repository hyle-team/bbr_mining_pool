import {Component, OnInit} from '@angular/core';
import {Chart} from 'angular-highcharts';
import {ApiService} from '../_helpers/services/api.service';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';

// @ts-ignore
import infoJSON from '../../../info.json';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardData: any;
  activeChartTab = 'hashrate';
  activeTableTab = 'blocks';
  network;
  pool;
  info;
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
  blocksLimit: number;
  blockFoundEvery: any;

  static drawChart(chartData, chartColorSeriesRGB, chartName): Chart {
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
    const months = 2591696818;
    const weeks = 604800000;
    const days = 86400000;
    const hours = 3600000;

    return new Chart({
      title: {text: ''},
      credits: {enabled: false},
      exporting: {enabled: false},
      legend: {enabled: false},

      navigator: {
        enabled: true,
        adaptToUpdatedData: false,
        height: 5,
        maskFill: '#64DDE2',
        maskInside: true,
        outlineWidth: 0,
        handles: {
          backgroundColor: '#64DDE2',
          borderColor: '#64DDE2',
          width: 7,
          height: 7,
          symbols: ['doublearrow', 'doublearrow'],
        }
      },

      chart: {
        type: 'line',
        backgroundColor: 'transparent',
        height: 250,
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
            fontSize: '12px',
          },
        },
        plotLines: [{
          color: '#fff',
          width: 1,
          value: chartName === 'effort' ? 100 : null
        }]
      },

      xAxis: {
        type: 'datetime',
        ordinal: true,
        gridLineColor: chartColor,
        lineColor: chartColor,
        lineWidth: 1,
        tickWidth: 1,
        tickLength: 5,
        tickColor: chartColor,
        labels: {
          style: {
            color: '#fff',
            fontSize: '12px',
            marginTop: '15px',
          },
        },
        minPadding: 0,
        maxPadding: 0,
        minTickInterval: 60000,
        events: {
          setExtremes(e) {
            const delta = e.max - e.min;
            if (parseInt(String(delta), 10) <= hours) {
              this.series.forEach((item) => {
                item.chart.series[0].options.dataGrouping.units[0] = ['minute', [10]];
                item.chart.redraw();
              });
            } else if (parseInt(String(delta), 10) <= days) {
              this.series.forEach((item) => {
                item.chart.series[0].options.dataGrouping.units[0] = ['hour', [1]];
                item.chart.redraw();
              });
            } else if (parseInt(String(delta), 10) <= weeks) {
              this.series.forEach((item) => {
                item.chart.series[0].options.dataGrouping.units[0] = ['day', [1]];
                item.chart.redraw();
              });
            } else if (parseInt(String(delta), 10) <= months) {
              this.series.forEach((item) => {
                item.chart.series[0].options.dataGrouping.units[0] = ['week', [1]];
                item.chart.redraw();
              });
            } else {
              this.series.forEach((item) => {
                item.chart.series[0].options.dataGrouping.units[0] = ['week', [1]];
                item.chart.redraw();
              });
            }
          },
        }
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

      rangeSelector: {
        enabled: true,
        inputEnabled: false,
        allButtonsEnabled: true,
        verticalAlign: 'bottom',
        x: -60,
        height: 45,
        buttonPosition: {
          align: 'center',
          y: 5,
        },
        labelStyle: {
          display: 'none',
        },
        buttons: [{
          type: 'month',
          count: 1,
          text: 'Months',
        }, {
          type: 'week',
          count: 1,
          text: 'Weeks',
        }, {
          type: 'day',
          count: 1,
          text: 'Days',
        }, {
          type: 'hour',
          count: 1,
          text: 'Hours',
        }],
        buttonSpacing: 0,
        buttonTheme: {
          width: 70,
          height: null,
          fill: 'transparent',
          stroke: '#64DDE2',
          'stroke-width': 1,
          r: 0,
          padding: 3,
          style: {
            color: '#64DDE2',
          },
          states: {
            hover: {
              fill: '#64DDE2',
              style: {
                color: '#09284A'
              }
            },
            select: {
              fill: '#64DDE2',
              stroke: '#64DDE2',
              'stroke-width': 1,
              style: {
                color: '#09284A',
                opacity: 1,
                fontWeight: 400,
              }
            },
          }
        },
        selected: 0,
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
        },
        line: {
          dataGrouping: {
            groupPixelWidth: 10
          }
        },
        series: {
          dataGrouping: {
            enabled: true,
            approximation: 'average',
            forced: true,
            units: [
              ['week', [1]]
            ]
          },
          states: {
            hover: {
              halo: {
                size: 0
              }
            }
          }
        },
      },
      series: [{
        type: 'area',
        data: chartData,
      }]
    });
  }

  constructor(
    private service: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.blocksLimit = 10;

  }

  ngOnInit() {
    this.dashboardData = this.activatedRoute.snapshot.data.resolverService;
    if (Object.keys(this.dashboardData).length !== 0) {
      this.network = this.dashboardData['network'];
      this.pool = this.dashboardData['pool'];
      this.info = infoJSON;
      this.charts = this.dashboardData['pool']['stats'];

      this.charts.forEach(item => {
        const itemDate = new Date(item[0]).getTime();
        this.chartsData.hashRate.unshift([itemDate, parseFloat(item[1][3])]);
        this.chartsData.difficulty.unshift([itemDate, parseFloat(item[1][1])]);
      });

      this.hashRateChart = DashboardComponent.drawChart(this.chartsData.hashRate, '100, 221, 226', 'hashrate');
      this.difficultyChart = DashboardComponent.drawChart(this.chartsData.difficulty, '49, 155, 251', 'difficulty');
    }

    this.service.getBlocks().subscribe(data => {
      this.blocks = data;

      // chart effort
      for (let item = 0; item < this.blocks.length; item++) {
        this.chartsData.effort.unshift([parseInt(this.blocks[item][0].endTime, 10), parseInt(this.blocks[item][0].effort, 10)]);
      }
      this.effortChart = DashboardComponent.drawChart(this.chartsData.effort, '100, 221, 226', 'effort');


      // Calculation Block Found Every
      const a = moment(parseInt(this.blocks[0][0].endTime, 10));
      const b = moment(parseInt(this.blocks[1][0].endTime, 10));
      const c = moment(parseInt(this.blocks[2][0].endTime, 10));
      const d = moment(parseInt(this.blocks[3][0].endTime, 10));
      const e = moment(parseInt(this.blocks[4][0].endTime, 10));
      const f = moment(parseInt(this.blocks[5][0].endTime, 10));
      const g = moment(parseInt(this.blocks[6][0].endTime, 10));
      const h = moment(parseInt(this.blocks[7][0].endTime, 10));
      const i = moment(parseInt(this.blocks[8][0].endTime, 10));
      const j = moment(parseInt(this.blocks[9][0].endTime, 10));

      const firstPair = a.diff(b, 'seconds');
      const secondPair = c.diff(d, 'seconds');
      const thirdPair = e.diff(f, 'seconds');
      const fourthPair = g.diff(h, 'seconds');
      const fifthPair = i.diff(j, 'seconds');

      const sum = firstPair + secondPair + thirdPair + fourthPair + fifthPair;
      const seconds = Math.round(sum / 5);

      const duration = moment.duration(seconds, 'seconds');
      if (duration._data.minutes === 0) {
        this.blockFoundEvery = duration._data.seconds + ' sec';
      } else if (duration._data.hours === 0) {
        this.blockFoundEvery = duration._data.minutes + 'm ' + duration._data.seconds + 'sec';
      } else if (duration._data.days === 0) {
        this.blockFoundEvery = duration._data.hours + 'h ' + duration._data.minutes + 'm ' + duration._data.seconds + 'sec';
      } else if (duration._data.months === 0) {
        this.blockFoundEvery = duration._data.days + 'd ' + duration._data.hours + 'h ' + duration._data.minutes + 'm ' + duration._data.seconds + 'sec';
      } else if (duration._data.years === 0) {
        this.blockFoundEvery = duration._data.months + 'month ' + duration._data.days + 'd ' + duration._data.hours + 'h ' + duration._data.minutes + 'm ' + duration._data.seconds + 'sec';
      }
    });
  }
}
