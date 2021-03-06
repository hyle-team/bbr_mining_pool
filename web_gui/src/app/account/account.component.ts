import {Component, OnInit} from '@angular/core';
import {Chart} from 'angular-highcharts';
import {ApiService} from '../_helpers/services/api.service';
import * as moment from 'moment';

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
  paymentsLimit: number;
  dailyAverage: any;
  dailyAverage24: any;
  weeklyAverage: any;
  monthlyAverage: any;
  show: boolean;
  loader: boolean;


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
          width: 8,
          height: 8,
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
        },
        events: {
          load() {
            // console.log(this);
          },
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
        tickInterval: days,

        events: {
          setExtremes(e) {
            const delta = e.max - e.min;
            // Hours
            if (parseInt(String(delta), 10) <= hours) {
              this.update({
                tickInterval: 600000
              }, false);
              this.series.forEach((item) => {
                item.chart.series[0].options.dataGrouping.units[0] = ['minute', [10]];
                item.chart.redraw();
              });
              // Days
            } else if (parseInt(String(delta), 10) <= days) {
              this.update({
                tickInterval: hours
              }, false);
              this.series.forEach((item) => {
                item.chart.series[0].options.dataGrouping.units[0] = ['hour', [1]];
                item.chart.redraw();
              });
              // Weeks
            } else if (parseInt(String(delta), 10) <= weeks) {
              this.update({
                tickInterval: days
              }, false);
              this.series.forEach((item) => {
                item.chart.series[0].options.dataGrouping.units[0] = ['day', [1]];
                item.chart.redraw();
              });
              // Months
            } else if (parseInt(String(delta), 10) <= months) {
              this.update({
                tickInterval: weeks
              }, false);
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
        },
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
          // dataGrouping: {
          //   enabled: true,
          //   approximation: 'average',
          //   forced: true,
          //   units: [
          //     ['week', [1]]
          //   ]
          // },
        }, {
          type: 'week',
          count: 1,
          text: 'Weeks',
          // dataGrouping: {
          //   enabled: true,
          //   approximation: 'average',
          //   forced: true,
          //   units: [
          //     ['day', [1]]
          //   ]
          // },
        }, {
          type: 'day',
          count: 1,
          text: 'Days',
          // dataGrouping: {
          //   enabled: true,
          //   approximation: 'average',
          //   forced: true,
          //   units: [
          //     ['hour', [1]]
          //   ]
          // },
        }, {
          type: 'minute',
          count: 10,
          text: 'Hours',
          // dataGrouping: {
          //   enabled: true,
          //   approximation: 'average',
          //   forced: true,
          //   units: [
          //     ['minute', [10]]
          //   ]
          // },
        }],
        buttonSpacing: 10,
        buttonTheme: {
          width: 70,
          height: null,
          fill: 'transparent',
          stroke: '#64DDE2',
          'stroke-width': 1,
          r: 5,
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
        selected: 1,
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
              ['day', [1]]
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

  constructor(private service: ApiService) {
    this.miningTabSelected = 'total';
    this.paymentsLimit = 10;
    this.show = false;
    this.loader = true;

    const walletAddressSaved = localStorage.getItem('walletAddress');
    if (walletAddressSaved && walletAddressSaved.length > 0) {
      this.walletAddress = walletAddressSaved;
      this.getInfoWallet();
    } else {
      this.loader = false;
      localStorage.removeItem('walletAddress');
    }
  }

  ngOnInit() {

  }

  getInfoWallet() {
    // this.loader = true;
    this.service.getMiner(this.walletAddress).subscribe(data => {
        this.workersList = [];
        this.charts = {};
        this.walletData = data;
        const hashRateChartInfo = data['workers']['hasrate_chart'];
        const workerStatsInfo = data['workers']['worker_stats'];

        const nowDate = Math.round(new Date().getTime() / 1000);
        const dailyPeriod = Math.round(+moment().subtract(24, 'hours') / 1000);
        const weeklyPeriod = Math.round(+moment().subtract(1, 'week') / 1000);
        const monthlyPeriod = Math.round(+moment().subtract(1, 'months') / 1000);

        let dailyTotal = 0;
        let dailyLen = 0;
        let weeklyTotal = 0;
        let weeklyLen = 0;
        let monthlyTotal = 0;
        let monthlyLen = 0;

        let dailyTotal24 = 0;
        let dailyLen24 = 0;
        let nameWorker2 = '';

        for (let i = 0; i < hashRateChartInfo.length; i++) {
          const itemDate = (Math.round(hashRateChartInfo[i][0] / 1000));
          const itemTotalHashrate = parseInt(hashRateChartInfo[i][1][3], 10);

          if (itemDate >= monthlyPeriod) {
            monthlyTotal += itemTotalHashrate;
            monthlyLen++;
          }
          if (itemDate >= weeklyPeriod) {
            weeklyTotal += itemTotalHashrate;
            weeklyLen++;
          }
          if ((itemDate >= dailyPeriod) && (itemDate <= nowDate)) {
            dailyTotal += itemTotalHashrate;
            dailyLen++;
          }


          for (let y = 0; y < hashRateChartInfo[1][1].length - 2; y++) {
            if (y % 2 === 0) {
              nameWorker2 = hashRateChartInfo[0][1][y].split(':')[1];
            } else {
              if (dailyPeriod <= (hashRateChartInfo[i][0] / 1000)) {
                dailyTotal24 += parseInt(hashRateChartInfo[i][1][1], 10);
                dailyLen24++;
              }
            }
          }
        }
        this.dailyAverage24 = dailyTotal24 / dailyLen24;
        this.dailyAverage24 = parseInt(this.dailyAverage24, 10) || 0;
        this.dailyAverage = dailyTotal / dailyLen;
        this.dailyAverage = parseInt(this.dailyAverage, 10) || 0;
        this.weeklyAverage = weeklyTotal / weeklyLen;
        this.weeklyAverage = parseInt(this.weeklyAverage, 10) || 0;
        this.monthlyAverage = monthlyTotal / monthlyLen;
        this.monthlyAverage = parseInt(this.monthlyAverage, 10) || 0;
        // charts
        hashRateChartInfo.forEach(item => {
          const itemDate = new Date(item[0]).getTime();
          if (!this.charts['total']) {
            this.charts['total'] = [];
          }
          this.charts['total'].unshift([itemDate, parseFloat(item[1][item[1].length - 1])]);
          let name = '';
          let hashrate = '';
          for (let i = 0; i < item[1].length - 2; i++) {
            if (i % 2 === 0) {
              name = item[1][i].split(':')[1];
            } else {
              hashrate = item[1][i];
              if (!this.charts[name]) {
                this.charts[name] = [];
              }
              this.charts[name].unshift([itemDate, parseFloat(hashrate)]);
            }
          }
        });

        this.setChart('total');

        let nameWorker = '';
        let hashRateWorker = '';
        let totalWorker, staleWorker, invalidWorker, blocksWorker, staleInterestWorker, invalidInteresWorker;

        for (let i = 0; i < hashRateChartInfo[0][1].length - 2; i++) {
          if (i % 2 === 0) {
            nameWorker = hashRateChartInfo[0][1][i].split(':')[1];
          } else {
            hashRateWorker = hashRateChartInfo[0][1][i];
            totalWorker = workerStatsInfo['total_' + nameWorker];
            staleWorker = workerStatsInfo['stale_' + nameWorker];
            staleInterestWorker = (parseInt(staleWorker, 10) / parseInt(totalWorker, 10)) * 100;
            invalidWorker = workerStatsInfo['invalid_' + nameWorker];
            invalidInteresWorker = (parseInt(invalidWorker, 10) / parseInt(totalWorker, 10)) * 100;
            blocksWorker = workerStatsInfo['blocks_' + nameWorker];
            this.workersList.push(
              {
                name: nameWorker,
                hashrate: hashRateWorker,
                hashrate24: parseInt(this.dailyAverage24, 10) || 0,
                total: parseInt(totalWorker, 10) || 0,
                stale: parseInt(staleWorker, 10) || 0,
                staleInterest: parseInt(staleInterestWorker.toFixed(1), 10) || 0,
                invalidInterest: parseInt(invalidInteresWorker.toFixed(1), 10) || 0,
                invalid: parseInt(invalidWorker, 10) || 0,
                blocks: parseInt(blocksWorker, 10) || 0
              }
            );
          }
        }
      }, (error) => console.log(error),
      () => {
        this.show = true;
        this.loader = false;
      });
  }

  setAddress() {
    // if walletAddress === valid
    if (this.walletAddress && this.walletAddress.length > 0) {
      localStorage.setItem('walletAddress', this.walletAddress);
      this.getInfoWallet();
    } else {
      this.loader = false;
      this.show = false;
      localStorage.removeItem('walletAddress');
    }
  }

  setChart(name) {
    this.miningTabSelected = name;
    this.chart = AccountComponent.drawChart(this.charts[this.miningTabSelected], '100, 221, 226', 'worker-hashrate');
  }

}
