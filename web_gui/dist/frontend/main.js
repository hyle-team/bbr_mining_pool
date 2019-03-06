(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_helpers/services/api.service.ts":
/*!**************************************************!*\
  !*** ./src/app/_helpers/services/api.service.ts ***!
  \**************************************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");




var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
        this.serverApi = 'http://127.0.0.1:3000';
    }
    ApiService.prototype.getDashboard = function () {
        var URL = this.serverApi + "/dashboard";
        return this.http.get(URL).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            return response;
        }));
    };
    ApiService.prototype.getBlocks = function () {
        var URL = this.serverApi + "/blocks";
        return this.http.get(URL).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            return response;
        }));
    };
    ApiService.prototype.getTx = function (hash) {
        var URL = this.serverApi + "/tx/" + hash;
        return this.http.get(URL).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            return response;
        }));
    };
    ApiService.prototype.getBalance = function (hash) {
        var URL = this.serverApi + "/balance/" + hash;
        return this.http.get(URL).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            return response;
        }));
    };
    ApiService.prototype.setAlias = function (hash, name) {
        var URL = this.serverApi + "/alias/" + hash + "/" + name;
        return this.http.get(URL).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            return response;
        }));
    };
    ApiService.prototype.checkAlias = function (name) {
        var URL = this.serverApi + "/check/" + name;
        return this.http.get(URL).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            return response;
        }));
    };
    ApiService.prototype.getAliasQueue = function () {
        var URL = this.serverApi + "/queue";
        return this.http.get(URL).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            return response;
        }));
    };
    ApiService.prototype.getMiner = function (hash) {
        var URL = this.serverApi + "/miner/" + hash;
        return this.http.get(URL).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            return response;
        }));
    };
    ApiService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "./src/app/account/account.component.html":
/*!************************************************!*\
  !*** ./src/app/account/account.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content-row\">\r\n  <div class=\"content-col\">\r\n    <div class=\"card enter-wallet\">\r\n      <div class=\"card-header\">\r\n        Wallet\r\n      </div>\r\n      <div class=\"card-content\">\r\n        <input type=\"text\" placeholder=\"Enter your wallet here\" [(ngModel)]=\"walletAddress\">\r\n        <button type=\"button\" (click)=\"getInfoWallet()\">Look up</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div *ngIf=\"walletData\">\r\n\r\n  <div class=\"content-row\">\r\n    <div class=\"content-col\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Overview\r\n        </div>\r\n        <div class=\"card-content\">\r\n\r\n          <div class=\"wrap-overview-tables\">\r\n            <table class=\"\">\r\n              <tbody>\r\n              <tr>\r\n                <td>Unconfirmed Balance</td>\r\n                <td>{{walletData['overview']['unconfirmed'] | number : '1.2-4'}} BBR</td>\r\n              </tr>\r\n              <tr>\r\n                <td>Total Paid</td>\r\n                <td>{{walletData['overview']['total'] | number : '1.2-4'}} BBR</td>\r\n              </tr>\r\n              <tr>\r\n                <td>Total Shares</td>\r\n                <td>{{walletData['overview']['shares'] | number : '1.0-0'}}</td>\r\n              </tr>\r\n              <tr>\r\n                <td>Payment Threshold</td>\r\n                <td>{{walletData['overview']['threshold'] | number : '1.2-4'}} BBR</td>\r\n              </tr>\r\n              <tr>\r\n                <td>Email Notification</td>\r\n                <td>No set yet</td>\r\n              </tr>\r\n              </tbody>\r\n            </table>\r\n\r\n            <table>\r\n              <tbody>\r\n              <tr>\r\n                <td>Confirmed Balance</td>\r\n                <td>{{walletData['overview']['confirmed'] | number : '1.2-4'}} BBR</td>\r\n              </tr>\r\n              <tr>\r\n                <td>24h Payments</td>\r\n                <td>{{walletData['overview']['h24'] | number : '1.2-4'}} BBR</td>\r\n              </tr>\r\n              <tr>\r\n                <td>24h Income</td>\r\n                <td>{{walletData['overview']['h24'] | number : '1.2-4'}} BBR</td>\r\n              </tr>\r\n              <tr>\r\n                <td>Current HashRate</td>\r\n                <td>{{walletData['overview']['hashRate']}} H/s</td>\r\n              </tr>\r\n              <tr>\r\n                <td>Payment Enable</td>\r\n                <td>ON</td>\r\n              </tr>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"content-row\">\r\n    <div class=\"content-col\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <ul class=\"tabs\">\r\n            <li class=\"tab\" [class.active]=\"miningTabSelected === 'hashrate'\">\r\n              <button type=\"button\" (click)=\"miningTabSelected = 'hashrate'\">Hashrate</button>\r\n            </li>\r\n            <li class=\"tab\" [class.active]=\"miningTabSelected === 'workers'\">\r\n              <button type=\"button\" (click)=\"miningTabSelected = 'workers'\">Workers</button>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n        <div class=\"card-content\">\r\n          <div [chart]=\"chart\" *ngIf=\"miningTabSelected === 'hashrate'\"></div>\r\n          <div class=\"wrap-table scrolled-content\" *ngIf=\"miningTabSelected === 'workers'\">\r\n            <table>\r\n              <thead>\r\n              <tr>\r\n                <th>Num</th>\r\n                <th>Name</th>\r\n                <th>Hashrate</th>\r\n                <th>Last Hash</th>\r\n                <th>Status</th>\r\n                <th>Action</th>\r\n              </tr>\r\n              </thead>\r\n              <tbody>\r\n              <tr>\r\n                <td>1</td>\r\n                <td>Aperture Science</td>\r\n                <td>0 Mh/s</td>\r\n                <td>1 day ago</td>\r\n                <td>Active</td>\r\n                <td>1</td>\r\n              </tr>\r\n              <tr>\r\n                <td>2</td>\r\n                <td>Aperture Science</td>\r\n                <td>0 Mh/s</td>\r\n                <td>1 day ago</td>\r\n                <td>Active</td>\r\n                <td>1</td>\r\n              </tr>\r\n              <tr>\r\n                <td>3</td>\r\n                <td>Aperture Science</td>\r\n                <td>0 Mh/s</td>\r\n                <td>1 day ago</td>\r\n                <td>Active</td>\r\n                <td>1</td>\r\n              </tr>\r\n              <tr>\r\n                <td>4</td>\r\n                <td>Aperture Science</td>\r\n                <td>0 Mh/s</td>\r\n                <td>1 day ago</td>\r\n                <td>Active</td>\r\n                <td>1</td>\r\n              </tr>\r\n              <tr>\r\n                <td>5</td>\r\n                <td>Aperture Science</td>\r\n                <td>0 Mh/s</td>\r\n                <td>1 day ago</td>\r\n                <td>Active</td>\r\n                <td>1</td>\r\n              </tr>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"content-row\">\r\n    <div class=\"content-col\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <ul class=\"tabs\">\r\n            <li class=\"tab\" [class.active]=\"rewardTabSelected === 'blocks'\">\r\n              <button type=\"button\" (click)=\"rewardTabSelected = 'blocks'\">Blocks</button>\r\n            </li>\r\n            <li class=\"tab\" [class.active]=\"rewardTabSelected === 'payments'\">\r\n              <button type=\"button\" (click)=\"rewardTabSelected = 'payments'\">Payments</button>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n        <div class=\"card-content\">\r\n          <div class=\"wrap-table scrolled-content\" *ngIf=\"rewardTabSelected === 'blocks'\">\r\n            <table>\r\n              <thead>\r\n              <tr>\r\n                <th>Height</th>\r\n                <th>Difficulty</th>\r\n                <th>Block Hash</th>\r\n                <th>Time Found</th>\r\n                <th>Effort</th>\r\n              </tr>\r\n              </thead>\r\n              <tbody>\r\n              <tr></tr>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n          <div class=\"wrap-table scrolled-content\" *ngIf=\"rewardTabSelected === 'payments'\">\r\n            <table>\r\n              <thead>\r\n              <tr>\r\n                <th>Time Sent</th>\r\n                <th>Transaction Hash</th>\r\n                <th>Amount</th>\r\n                <th>Fee</th>\r\n                <th>Mixin</th>\r\n                <th>Payees</th>\r\n              </tr>\r\n              </thead>\r\n              <tbody>\r\n              <tr *ngFor=\"let payment of walletData['payments']['transactions']\">\r\n                <td>{{payment['time'] | date : 'dd.MM.yyyy, hh:mm:ss'}}</td>\r\n                <td>\r\n                  <a [href]=\"'#'\">{{payment['tx']}}</a>\r\n                </td>\r\n                <td>\r\n                  {{payment['balance']/1000000000000 | number : '1.4-4'}}\r\n                </td>\r\n                <td>0.0010</td>\r\n                <td>3</td>\r\n                <td>1</td>\r\n              </tr>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/account/account.component.scss":
/*!************************************************!*\
  !*** ./src/app/account/account.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".content-row {\n  margin-top: 4rem; }\n\n.tabs {\n  margin: 0 -2rem;\n  padding: 0; }\n\n.tabs .tab {\n    margin: 0 2rem; }\n\n.enter-wallet input {\n  background-color: rgba(100, 221, 226, 0.1);\n  border: none;\n  border-bottom: 0.1rem solid rgba(100, 221, 226, 0.5);\n  box-sizing: border-box;\n  color: #64dde2;\n  font-size: 1.8rem;\n  font-style: normal;\n  font-weight: 300;\n  margin: 1rem 0;\n  padding: 1.5rem;\n  outline-style: none;\n  width: 100%; }\n\n.enter-wallet input::-webkit-input-placeholder {\n    color: rgba(100, 221, 226, 0.5);\n    font-style: italic;\n    font-weight: 100; }\n\n.enter-wallet input::-moz-placeholder {\n    color: rgba(100, 221, 226, 0.5);\n    font-style: italic;\n    font-weight: 100; }\n\n.enter-wallet input::-ms-input-placeholder {\n    color: rgba(100, 221, 226, 0.5);\n    font-style: italic;\n    font-weight: 100; }\n\n.enter-wallet button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: #319bfb;\n  border: 0;\n  border-radius: 0.5rem;\n  box-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.16);\n  color: #fff;\n  cursor: pointer;\n  font-size: 1.8rem;\n  font-weight: 500;\n  margin-top: 3rem;\n  margin-left: auto;\n  width: 16rem;\n  height: 5rem; }\n\n.wrap-table {\n  overflow-x: auto; }\n\n.wrap-overview-tables {\n  display: flex;\n  justify-content: space-between; }\n\n@media (max-width: 575.98px) {\n    .wrap-overview-tables {\n      flex-direction: column; } }\n\n.wrap-overview-tables > table {\n    width: 40%; }\n\n@media (max-width: 575.98px) {\n      .wrap-overview-tables > table {\n        width: 100%; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWNjb3VudC9EOlxcYm9vbF9wb29sL3NyY1xcYXBwXFxhY2NvdW50XFxhY2NvdW50LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCLEVBQUE7O0FBR2xCO0VBQ0UsZUFBZTtFQUNmLFVBQVUsRUFBQTs7QUFGWjtJQUtJLGNBQWMsRUFBQTs7QUFJbEI7RUFHSSwwQ0FBOEI7RUFDOUIsWUFBWTtFQUNaLG9EQUF3QztFQUN4QyxzQkFBc0I7RUFDdEIsY0FBYztFQUNkLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLFdBQVcsRUFBQTs7QUFkZjtJQWlCTSwrQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLGdCQUFnQixFQUFBOztBQW5CdEI7SUF1Qk0sK0JBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixnQkFBZ0IsRUFBQTs7QUF6QnRCO0lBNkJNLCtCQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsZ0JBQWdCLEVBQUE7O0FBL0J0QjtFQW9DSSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2Qix5QkFBeUI7RUFDekIsU0FBUztFQUNULHFCQUFxQjtFQUNyQiwrQ0FBcUM7RUFDckMsV0FBVztFQUNYLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsWUFBWTtFQUNaLFlBQVksRUFBQTs7QUFJaEI7RUFDRSxnQkFBZ0IsRUFBQTs7QUFHbEI7RUFDRSxhQUFhO0VBQ2IsOEJBQThCLEVBQUE7O0FBQzlCO0lBSEY7TUFJSSxzQkFBc0IsRUFBQSxFQVF6Qjs7QUFaRDtJQU9JLFVBQVUsRUFBQTs7QUFDVjtNQVJKO1FBU00sV0FBVyxFQUFBLEVBRWQiLCJmaWxlIjoic3JjL2FwcC9hY2NvdW50L2FjY291bnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGVudC1yb3cge1xyXG4gIG1hcmdpbi10b3A6IDRyZW07XHJcbn1cclxuXHJcbi50YWJzIHtcclxuICBtYXJnaW46IDAgLTJyZW07XHJcbiAgcGFkZGluZzogMDtcclxuXHJcbiAgLnRhYiB7XHJcbiAgICBtYXJnaW46IDAgMnJlbTtcclxuICB9XHJcbn1cclxuXHJcbi5lbnRlci13YWxsZXQge1xyXG5cclxuICBpbnB1dCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKCM2NGRkZTIsIDAuMSk7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tOiAwLjFyZW0gc29saWQgcmdiYSgjNjRkZGUyLCAwLjUpO1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIGNvbG9yOiAjNjRkZGUyO1xyXG4gICAgZm9udC1zaXplOiAxLjhyZW07XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBmb250LXdlaWdodDogMzAwO1xyXG4gICAgbWFyZ2luOiAxcmVtIDA7XHJcbiAgICBwYWRkaW5nOiAxLjVyZW07XHJcbiAgICBvdXRsaW5lLXN0eWxlOiBub25lO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcblxyXG4gICAgJjo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XHJcbiAgICAgIGNvbG9yOiByZ2JhKCM2NGRkZTIsIDAuNSk7XHJcbiAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgICAgZm9udC13ZWlnaHQ6IDEwMDtcclxuICAgIH1cclxuXHJcbiAgICAmOjotbW96LXBsYWNlaG9sZGVyIHtcclxuICAgICAgY29sb3I6IHJnYmEoIzY0ZGRlMiwgMC41KTtcclxuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgICBmb250LXdlaWdodDogMTAwO1xyXG4gICAgfVxyXG5cclxuICAgICY6Oi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XHJcbiAgICAgIGNvbG9yOiByZ2JhKCM2NGRkZTIsIDAuNSk7XHJcbiAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgICAgZm9udC13ZWlnaHQ6IDEwMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJ1dHRvbiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMxOWJmYjtcclxuICAgIGJvcmRlcjogMDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcclxuICAgIGJveC1zaGFkb3c6IDAgMC4ycmVtIDAuNnJlbSByZ2JhKCMwMDAsIDAuMTYpO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBmb250LXNpemU6IDEuOHJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBtYXJnaW4tdG9wOiAzcmVtO1xyXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgICB3aWR0aDogMTZyZW07XHJcbiAgICBoZWlnaHQ6IDVyZW07XHJcbiAgfVxyXG59XHJcblxyXG4ud3JhcC10YWJsZSB7XHJcbiAgb3ZlcmZsb3cteDogYXV0bztcclxufVxyXG5cclxuLndyYXAtb3ZlcnZpZXctdGFibGVzIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBAbWVkaWEgKG1heC13aWR0aDogNTc1Ljk4cHgpIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgfVxyXG4gID4gdGFibGUge1xyXG4gICAgd2lkdGg6IDQwJTtcclxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA1NzUuOThweCkge1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/account/account.component.ts":
/*!**********************************************!*\
  !*** ./src/app/account/account.component.ts ***!
  \**********************************************/
/*! exports provided: AccountComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountComponent", function() { return AccountComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angular_highcharts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-highcharts */ "./node_modules/angular-highcharts/fesm5/angular-highcharts.js");
/* harmony import */ var _helpers_services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_helpers/services/api.service */ "./src/app/_helpers/services/api.service.ts");




var AccountComponent = /** @class */ (function () {
    function AccountComponent(service) {
        this.service = service;
        this.miningTabSelected = 'workers';
        this.rewardTabSelected = 'payments';
    }
    AccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getDashboard().subscribe(function (data) {
            _this.charts = data['charts'];
        });
        this.chart = new angular_highcharts__WEBPACK_IMPORTED_MODULE_2__["Chart"]({
            title: { text: '' },
            credits: { enabled: false },
            exporting: { enabled: false },
            legend: { enabled: false },
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
    };
    AccountComponent.prototype.getInfoWallet = function () {
        var _this = this;
        this.service.getMiner(this.walletAddress).subscribe(function (data) {
            _this.walletData = data;
        });
    };
    AccountComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-account',
            template: __webpack_require__(/*! ./account.component.html */ "./src/app/account/account.component.html"),
            styles: [__webpack_require__(/*! ./account.component.scss */ "./src/app/account/account.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_helpers_services_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"]])
    ], AccountComponent);
    return AccountComponent;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _account_account_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./account/account.component */ "./src/app/account/account.component.ts");
/* harmony import */ var _stats_stats_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./stats/stats.component */ "./src/app/stats/stats.component.ts");
/* harmony import */ var _docs_docs_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./docs/docs.component */ "./src/app/docs/docs.component.ts");







var routes = [
    {
        path: '',
        component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["DashboardComponent"]
    },
    {
        path: 'dashboard',
        component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["DashboardComponent"]
    },
    {
        path: 'account',
        component: _account_account_component__WEBPACK_IMPORTED_MODULE_4__["AccountComponent"]
    },
    {
        path: 'stats',
        component: _stats_stats_component__WEBPACK_IMPORTED_MODULE_5__["StatsComponent"]
    },
    {
        path: 'docs',
        component: _docs_docs_component__WEBPACK_IMPORTED_MODULE_6__["DocsComponent"]
    },
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header>\r\n  <div class=\"container\">\r\n    <div class=\"content-row\">\r\n      <div class=\"content-col logo\">\r\n        Mining Pool\r\n      </div>\r\n\r\n      <ul class=\"content-col tabs\">\r\n        <li class=\"tab\" [routerLinkActive]=\"'active'\">\r\n          <button [routerLink]=\"['/dashboard']\">Dashboard</button>\r\n        </li>\r\n        <li class=\"tab\" [routerLinkActive]=\"'active'\">\r\n          <button [routerLink]=\"['/account']\">Account</button>\r\n        </li>\r\n        <li class=\"tab\" [routerLinkActive]=\"'active'\">\r\n          <button [routerLink]=\"['/stats']\">Stats</button>\r\n        </li>\r\n        <li class=\"tab\" [routerLinkActive]=\"'active'\">\r\n          <button [routerLink]=\"['/docs']\">Docs</button>\r\n        </li>\r\n      </ul>\r\n\r\n      <div class=\"content-col get-alias\">\r\n        <button>Get Alias</button>\r\n      </div>\r\n      <div class=\"content-col btn-mobile-nav\">\r\n        <button type=\"button\" (click)=\"toggleMobileNav()\" [ngClass]=\"{'show': navIsOpen === true }\"></button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n\r\n<nav class=\"mobile-nav\" [ngClass]=\"{'show': navIsOpen === true }\">\r\n  <ul>\r\n    <li><a [routerLink]=\"['/dashboard']\" routerLinkActive=\"active\">Dashboard</a></li>\r\n    <li><a [routerLink]=\"['/account']\" routerLinkActive=\"active\">Account</a></li>\r\n    <li><a [routerLink]=\"['/stats']\" routerLinkActive=\"active\">Stats</a></li>\r\n    <li><a [routerLink]=\"['/docs']\" routerLinkActive=\"active\">Docs</a></li>\r\n    <li class=\"wrap-alias-btn\"><button type=\"button\">Get Alias</button></li>\r\n  </ul>\r\n</nav>\r\n\r\n\r\n<div class=\"container\">\r\n  <router-outlet></router-outlet>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host > .container {\n  margin-bottom: 7rem; }\n\nheader {\n  border-bottom: #0c68cc solid 0.1rem;\n  height: 8rem;\n  position: relative;\n  z-index: 11;\n  background-color: #001c3b; }\n\nheader .container .content-row {\n    align-items: center;\n    justify-content: space-between; }\n\nheader .container .content-row .logo {\n      display: flex;\n      align-items: center;\n      justify-content: flex-start;\n      font-size: 3rem;\n      font-weight: bold; }\n\nheader .container .content-row .get-alias {\n      display: flex;\n      align-items: center;\n      justify-content: flex-end; }\n\nheader .container .content-row .get-alias button {\n        background-color: #319bfb;\n        border: 0;\n        border-radius: 0.5rem;\n        box-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.16);\n        color: #fff;\n        cursor: pointer;\n        width: 16rem;\n        height: 5rem; }\n\nheader .container .content-row .btn-mobile-nav {\n      display: none;\n      justify-content: flex-end; }\n\n@media (max-width: 767.98px) {\n        header .container .content-row .btn-mobile-nav {\n          display: flex; } }\n\nheader .container .content-row .btn-mobile-nav button {\n        width: 3.1rem;\n        height: 2.9rem;\n        background-color: transparent;\n        border: none;\n        background-image: url('mobile-nav.svg');\n        background-repeat: no-repeat;\n        background-position: 0 0;\n        cursor: pointer; }\n\nheader .container .content-row .btn-mobile-nav button.show {\n          background-image: url('close.svg'); }\n\n@media (max-width: 767.98px) {\n      header .container .content-row .get-alias, header .container .content-row .tabs {\n        display: none; } }\n\n@media (max-width: 767.98px) {\n      header .container .content-row {\n        flex-direction: row; } }\n\nnav.mobile-nav {\n  height: 0;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  transition: 0.5s;\n  display: flex;\n  flex-direction: column;\n  background-color: #001c3b;\n  z-index: -1; }\n\nnav.mobile-nav ul {\n    margin: 0;\n    padding: 0;\n    height: 100%; }\n\nnav.mobile-nav ul > li {\n      height: 20%;\n      list-style-type: none; }\n\nnav.mobile-nav ul > li > a {\n        width: 100%;\n        height: 100%;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        text-decoration: none;\n        font-size: 1.8rem;\n        font-weight: 300;\n        color: #fff;\n        border-bottom: 1px solid rgba(12, 104, 204, 0.5);\n        outline: none; }\n\nnav.mobile-nav ul > li > a.active {\n          font-weight: 500; }\n\nnav.mobile-nav ul > li.wrap-alias-btn {\n        padding: 0 2.3rem;\n        display: flex;\n        align-items: center; }\n\nnav.mobile-nav ul > li.wrap-alias-btn > button {\n          width: 100%;\n          height: 5rem;\n          box-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.16);\n          border-radius: 0.5rem;\n          background-color: rgba(49, 155, 251, 0.7);\n          color: #fff;\n          font-size: 1.8rem;\n          font-weight: 500;\n          border: none;\n          outline: none;\n          cursor: pointer; }\n\n@media (max-width: 767.98px) {\n    nav.mobile-nav.show {\n      opacity: 1;\n      height: 44rem;\n      top: 8.1rem;\n      z-index: 10; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvRDpcXGJvb2xfcG9vbC9zcmNcXGFwcFxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBRUksbUJBQW1CLEVBQUE7O0FBSXZCO0VBQ0UsbUNBQW1DO0VBQ25DLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLHlCQUF5QixFQUFBOztBQUwzQjtJQVFJLG1CQUFtQjtJQUNuQiw4QkFBOEIsRUFBQTs7QUFUbEM7TUFZTSxhQUFhO01BQ2IsbUJBQW1CO01BQ25CLDJCQUEyQjtNQUMzQixlQUFlO01BQ2YsaUJBQWlCLEVBQUE7O0FBaEJ2QjtNQW9CTSxhQUFhO01BQ2IsbUJBQW1CO01BQ25CLHlCQUF5QixFQUFBOztBQXRCL0I7UUF5QlEseUJBQXlCO1FBQ3pCLFNBQVM7UUFDVCxxQkFBcUI7UUFDckIsK0NBQStDO1FBQy9DLFdBQVc7UUFDWCxlQUFlO1FBQ2YsWUFBWTtRQUNaLFlBQVksRUFBQTs7QUFoQ3BCO01Bb0NNLGFBQWE7TUFDYix5QkFBeUIsRUFBQTs7QUFDekI7UUF0Q047VUF1Q1EsYUFBYSxFQUFBLEVBZWhCOztBQXRETDtRQTBDUSxhQUFhO1FBQ2IsY0FBYztRQUNkLDZCQUE2QjtRQUM3QixZQUFZO1FBQ1osdUNBQW1EO1FBQ25ELDRCQUE0QjtRQUM1Qix3QkFBd0I7UUFDeEIsZUFBZSxFQUFBOztBQWpEdkI7VUFtRFUsa0NBQThDLEVBQUE7O0FBSXBEO01BdkRKO1FBeURRLGFBQWEsRUFBQSxFQUNkOztBQUVIO01BNURKO1FBNkRNLG1CQUFtQixFQUFBLEVBRXRCOztBQUlIO0VBQ0UsU0FBUztFQUNULGtCQUFrQjtFQUNsQixPQUFPO0VBQ1AsTUFBTTtFQUNOLFdBQVc7RUFDWCxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix5QkFBeUI7RUFDekIsV0FBVyxFQUFBOztBQVZiO0lBWUksU0FBUztJQUNULFVBQVU7SUFDVixZQUFZLEVBQUE7O0FBZGhCO01BZ0JNLFdBQVc7TUFDWCxxQkFBcUIsRUFBQTs7QUFqQjNCO1FBbUJRLFdBQVc7UUFDWCxZQUFZO1FBQ1osYUFBYTtRQUNiLHVCQUF1QjtRQUN2QixtQkFBbUI7UUFDbkIscUJBQW9CO1FBQ3BCLGlCQUFpQjtRQUNqQixnQkFBZ0I7UUFDaEIsV0FBVztRQUNYLGdEQUFxQztRQUNyQyxhQUFhLEVBQUE7O0FBN0JyQjtVQStCVSxnQkFBZ0IsRUFBQTs7QUEvQjFCO1FBbUNRLGlCQUFpQjtRQUNqQixhQUFhO1FBQ2IsbUJBQW1CLEVBQUE7O0FBckMzQjtVQXVDVSxXQUFXO1VBQ1gsWUFBWTtVQUNaLCtDQUErQztVQUMvQyxxQkFBcUI7VUFDckIseUNBQThCO1VBQzlCLFdBQVc7VUFDWCxpQkFBaUI7VUFDakIsZ0JBQWdCO1VBQ2hCLFlBQVk7VUFDWixhQUFhO1VBQ2IsZUFBZSxFQUFBOztBQU12QjtJQXZERjtNQXlETSxVQUFVO01BQ1YsYUE5SGlCO01BK0hqQixXQUFXO01BQ1gsV0FBVyxFQUFBLEVBQ1oiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgPiAuY29udGFpbmVyIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDdyZW07XHJcbiAgfVxyXG59XHJcbiRoZWlnaHRNb2JpbGVOYXY6IDQ0cmVtO1xyXG5oZWFkZXIge1xyXG4gIGJvcmRlci1ib3R0b206ICMwYzY4Y2Mgc29saWQgMC4xcmVtO1xyXG4gIGhlaWdodDogOHJlbTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgei1pbmRleDogMTE7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMWMzYjtcclxuXHJcbiAgLmNvbnRhaW5lciAuY29udGVudC1yb3cge1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuXHJcbiAgICAubG9nbyB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgICAgZm9udC1zaXplOiAzcmVtO1xyXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIH1cclxuXHJcbiAgICAuZ2V0LWFsaWFzIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuXHJcbiAgICAgIGJ1dHRvbiB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMxOWJmYjtcclxuICAgICAgICBib3JkZXI6IDA7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xyXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMC4ycmVtIDAuNnJlbSByZ2JhKDAsIDAsIDAsIDAuMTYpO1xyXG4gICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICB3aWR0aDogMTZyZW07XHJcbiAgICAgICAgaGVpZ2h0OiA1cmVtO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAuYnRuLW1vYmlsZS1uYXYge1xyXG4gICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogNzY3Ljk4cHgpIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICB9XHJcbiAgICAgIGJ1dHRvbiB7XHJcbiAgICAgICAgd2lkdGg6IDMuMXJlbTtcclxuICAgICAgICBoZWlnaHQ6IDIuOXJlbTtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgICAgICBib3JkZXI6IG5vbmU7XHJcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4uL2Fzc2V0cy9pbWcvbW9iaWxlLW5hdi5zdmcpO1xyXG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAmLnNob3cge1xyXG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4uL2Fzc2V0cy9pbWcvY2xvc2Uuc3ZnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjcuOThweCkge1xyXG4gICAgICAuZ2V0LWFsaWFzLCAudGFicyB7XHJcbiAgICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2Ny45OHB4KSB7XHJcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxubmF2Lm1vYmlsZS1uYXYge1xyXG4gIGhlaWdodDogMDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbGVmdDogMDtcclxuICB0b3A6IDA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgdHJhbnNpdGlvbjogMC41cztcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMWMzYjtcclxuICB6LWluZGV4OiAtMTtcclxuICB1bCB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgPiBsaSB7XHJcbiAgICAgIGhlaWdodDogMjAlO1xyXG4gICAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgICAgID4gYSB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICB0ZXh0LWRlY29yYXRpb246bm9uZTtcclxuICAgICAgICBmb250LXNpemU6IDEuOHJlbTtcclxuICAgICAgICBmb250LXdlaWdodDogMzAwO1xyXG4gICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKCMwYzY4Y2MsIC41KTtcclxuICAgICAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgICAgICYuYWN0aXZlIHtcclxuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgICYud3JhcC1hbGlhcy1idG4ge1xyXG4gICAgICAgIHBhZGRpbmc6IDAgMi4zcmVtO1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICA+IGJ1dHRvbiB7XHJcbiAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICAgIGhlaWdodDogNXJlbTtcclxuICAgICAgICAgIGJveC1zaGFkb3c6IDAgMC4ycmVtIDAuNnJlbSByZ2JhKDAsIDAsIDAsIDAuMTYpO1xyXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xyXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgjMzE5YmZiLCAuNyk7XHJcbiAgICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMS44cmVtO1xyXG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBAbWVkaWEgKG1heC13aWR0aDogNzY3Ljk4cHgpIHtcclxuICAgICYuc2hvdyB7XHJcbiAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgIGhlaWdodDogJGhlaWdodE1vYmlsZU5hdjtcclxuICAgICAgdG9wOiA4LjFyZW07XHJcbiAgICAgIHotaW5kZXg6IDEwO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _helpers_services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_helpers/services/api.service */ "./src/app/_helpers/services/api.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var AppComponent = /** @class */ (function () {
    function AppComponent(apiService, router) {
        var _this = this;
        this.apiService = apiService;
        this.router = router;
        this.title = 'frontend';
        this.navIsOpen = false;
        router.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__["NavigationEnd"]) {
                if (_this.navIsOpen === true) {
                    _this.navIsOpen = false;
                }
            }
        });
        this.apiService.getDashboard().subscribe(function (data) {
            console.log(data);
        }, function (err) { return console.error(err); });
        this.apiService.getBlocks().subscribe(function (data) {
            console.log(data);
        }, function (err) { return console.error(err); });
        this.apiService.getTx('1CR7PTbKuA42P43d4rYmTq8f2i4hqHV7uaW1LFietAGBY3K9vanbstrAx3NtBecmfxA3S7yCSTUG1LthdgukBAoEDk6xwuF').subscribe(function (data) {
            console.log(data);
        }, function (err) { return console.error(err); });
        this.apiService.getBalance('1CR7PTbKuA42P43d4rYmTq8f2i4hqHV7uaW1LFietAGBY3K9vanbstrAx3NtBecmfxA3S7yCSTUG1LthdgukBAoEDk6xwuF').subscribe(function (data) {
            console.log(data);
        }, function (err) { return console.error(err); });
        this.apiService.setAlias('1CR7PTbKuA42P43d4rYmTq8f2i4hqHV7uaW1LFietAGBY3K9vanbstrAx3NtBecmfxA3S7yCSTUG1LthdgukBAoEDk6xwuF', 'newAlias').subscribe(function (data) {
            console.log(data);
        }, function (err) { return console.error(err); });
        this.apiService.checkAlias('newAlias').subscribe(function (data) {
            console.log(data);
        }, function (err) { return console.error(err); });
        this.apiService.getAliasQueue().subscribe(function (data) {
            console.log(data);
        }, function (err) { return console.error(err); });
        this.apiService.getMiner('1CR7PTbKuA42P43d4rYmTq8f2i4hqHV7uaW1LFietAGBY3K9vanbstrAx3NtBecmfxA3S7yCSTUG1LthdgukBAoEDk6xwuF').subscribe(function (data) {
            console.log(data);
        }, function (err) { return console.error(err); });
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.toggleMobileNav = function () {
        this.navIsOpen = this.navIsOpen !== true;
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_helpers_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _account_account_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./account/account.component */ "./src/app/account/account.component.ts");
/* harmony import */ var _stats_stats_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./stats/stats.component */ "./src/app/stats/stats.component.ts");
/* harmony import */ var _docs_docs_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./docs/docs.component */ "./src/app/docs/docs.component.ts");
/* harmony import */ var angular_highcharts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! angular-highcharts */ "./node_modules/angular-highcharts/fesm5/angular-highcharts.js");












var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_7__["DashboardComponent"],
                _account_account_component__WEBPACK_IMPORTED_MODULE_8__["AccountComponent"],
                _stats_stats_component__WEBPACK_IMPORTED_MODULE_9__["StatsComponent"],
                _docs_docs_component__WEBPACK_IMPORTED_MODULE_10__["DocsComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
                angular_highcharts__WEBPACK_IMPORTED_MODULE_11__["ChartModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/*!****************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content-row\">\r\n  <div class=\"content-col\">\r\n    <div class=\"card network-card\" *ngIf=\"network\">\r\n      <div class=\"card-header\">\r\n        Network\r\n      </div>\r\n      <div class=\"card-content\">\r\n        <div class=\"card-content-row\">\r\n          <label>Hash Rate</label>\r\n          <span>{{network['hashRate']}} GH/sec</span>\r\n        </div>\r\n        <div class=\"card-content-row\">\r\n          <label>Block Found</label>\r\n          <span>{{network['blockFound']}} min ago</span>\r\n        </div>\r\n        <div class=\"card-content-row\">\r\n          <label>Difficulty</label>\r\n          <span>{{network['difficulty']}}</span>\r\n        </div>\r\n        <div class=\"card-content-row\">\r\n          <label>Block Height</label>\r\n          <span>{{network['blockHeight']}}</span>\r\n        </div>\r\n        <div class=\"card-content-row\">\r\n          <label>Last Reward</label>\r\n          <span>{{network['lastReward']}} BBR</span>\r\n        </div>\r\n        <div class=\"card-content-row\">\r\n          <label>Last Hash</label>\r\n          <a [href]=\"'#'\">{{network['lastHash']}}</a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"content-col\">\r\n    <div class=\"card pool-card\" *ngIf=\"pool\">\r\n      <div class=\"card-header\">\r\n        Pool\r\n      </div>\r\n      <div class=\"card-content\">\r\n        <div class=\"card-content-row\">\r\n          <label>Hash Rate</label>\r\n          <span>{{pool['hashRate']}} MH/sec</span>\r\n        </div>\r\n        <div class=\"card-content-row\">\r\n          <label>Block found</label>\r\n          <span>{{pool['blockFound']}} min ago</span>\r\n        </div>\r\n        <div class=\"card-content-row\">\r\n          <label>Connected Miners</label>\r\n          <span>{{pool['miners']}}</span>\r\n        </div>\r\n        <div class=\"card-content-row\">\r\n          <label>Donations</label>\r\n          <span>{{pool['effort']}}%</span>\r\n        </div>\r\n        <div class=\"card-content-row\">\r\n          <label>Total Pool Fee</label>\r\n          <span>{{pool['fee']}}%</span>\r\n        </div>\r\n        <div class=\"card-content-row\">\r\n          <label>Block Found Every</label>\r\n          <span></span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"content-col\">\r\n    <div class=\"card config-card\">\r\n      <div class=\"card-header\">\r\n        Config\r\n      </div>\r\n      <div class=\"card-content\">\r\n        <div class=\"card-content-row\">\r\n          <label>USA, East coast, start diff 12500</label>\r\n          <span>URL</span>\r\n        </div>\r\n        <div class=\"card-content-row\">\r\n          <label>USA, East coast, start diff 12500</label>\r\n          <span>URL</span>\r\n        </div>\r\n        <div class=\"card-content-row\">\r\n          <label>USA, East coast, start diff 12500</label>\r\n          <span>URL</span>\r\n        </div>\r\n        <div class=\"card-content-row\">\r\n          <label>USA, East coast, start diff 12500</label>\r\n          <span>URL</span>\r\n        </div>\r\n        <div class=\"card-content-row\">\r\n          <label>USA, East coast, start diff 12500</label>\r\n          <span>URL</span>\r\n        </div>\r\n        <div class=\"card-content-row\">\r\n          <label>USA, East coast, start diff 12500</label>\r\n          <span>URL</span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"content-row\">\r\n  <div class=\"content-col\">\r\n    <div class=\"card\">\r\n      <div class=\"card-header\">\r\n        <ul class=\"tabs\">\r\n          <li class=\"tab\" [class.active]=\"activeChartTab === 'hashrate'\">\r\n            <button type=\"button\" (click)=\"activeChartTab = 'hashrate'\">Hashrate</button>\r\n          </li>\r\n          <li class=\"tab\" [class.active]=\"activeChartTab === 'difficulty'\">\r\n            <button type=\"button\" (click)=\"activeChartTab = 'difficulty'\">Difficulty</button>\r\n          </li>\r\n          <li class=\"tab\" [class.active]=\"activeChartTab === 'effort'\">\r\n            <button type=\"button\" (click)=\"activeChartTab = 'effort'\">Effort</button>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div class=\"card-content\">\r\n        <div [chart]=\"hashRateChart\" *ngIf=\"activeChartTab === 'hashrate'\"></div>\r\n        <div [chart]=\"difficultyChart\" *ngIf=\"activeChartTab === 'difficulty'\"></div>\r\n        <div [chart]=\"effortChart\" *ngIf=\"activeChartTab === 'effort'\"></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"content-row\">\r\n  <div class=\"content-col\">\r\n    <div class=\"card\">\r\n      <div class=\"card-header\">\r\n        <ul class=\"tabs\">\r\n          <li class=\"tab\" [class.active]=\"activeTableTab === 'blocks'\">\r\n            <button type=\"button\" (click)=\"activeTableTab = 'blocks'\">Blocks</button>\r\n          </li>\r\n          <li class=\"tab\" [class.active]=\"activeTableTab === 'payments'\">\r\n            <button type=\"button\" (click)=\"activeTableTab = 'payments'\">Payments</button>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div class=\"card-content\">\r\n        <div class=\"wrap-table scrolled-content\" *ngIf=\"activeTableTab === 'blocks'\">\r\n          <table>\r\n            <thead>\r\n            <tr>\r\n              <th>Height</th>\r\n              <th>Difficulty</th>\r\n              <th>Block Hash</th>\r\n              <th>Time Found</th>\r\n              <th>Effort</th>\r\n            </tr>\r\n            </thead>\r\n            <tbody>\r\n            <tr *ngFor=\"let block of blocks\">\r\n              <td>{{block['height']}}</td>\r\n              <td>{{block['difficulty']}}</td>\r\n              <td>\r\n                <a [href]=\"'#'\">{{block['hash']}}</a>\r\n              </td>\r\n              <td>{{block['startTime'] | date : 'dd.MM.yyyy, hh:mm:ss'}}</td>\r\n              <td>{{(block['shares'] * 100) / 413260 | number : '1.0-0'}}%</td>\r\n            </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n        <div class=\"wrap-table scrolled-content\" *ngIf=\"activeTableTab === 'payments'\">\r\n          <table>\r\n            <thead>\r\n            <tr>\r\n              <th>Time Sent</th>\r\n              <th>Transaction Hash</th>\r\n              <th>Amount</th>\r\n              <th>Fee</th>\r\n              <th>Mixin</th>\r\n              <th>Payees</th>\r\n            </tr>\r\n            </thead>\r\n            <tbody>\r\n            <tr></tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.scss":
/*!****************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".content-row {\n  margin-top: 4rem; }\n  @media (max-width: 991.98px) {\n    .content-row {\n      flex-direction: column; }\n      .content-row .content-col:not(:first-child) {\n        margin-top: 4rem; } }\n  .tabs {\n  margin: 0 -2rem;\n  padding: 0; }\n  .tabs .tab {\n    margin: 0 2rem; }\n  .card-content-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: 4rem; }\n  .card-content-row label {\n    flex: 1 0 auto; }\n  .card-content-row span, .card-content-row a {\n    flex: 0 1 100%;\n    text-align: left;\n    text-overflow: ellipsis;\n    overflow: hidden; }\n  .network-card .card-content-row span {\n  max-width: 12rem; }\n  .network-card .card-content-row a {\n  color: #64dde2;\n  width: 12rem;\n  max-width: 12rem; }\n  .pool-card .card-content-row span {\n  max-width: 10rem; }\n  .config-card .card-content-row span {\n  color: #64dde2;\n  max-width: 3rem; }\n  .wrap-table {\n  overflow-x: auto; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGFzaGJvYXJkL0Q6XFxib29sX3Bvb2wvc3JjXFxhcHBcXGRhc2hib2FyZFxcZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCLEVBQUE7RUFFaEI7SUFIRjtNQUlJLHNCQUFzQixFQUFBO01BSjFCO1FBT00sZ0JBQWdCLEVBQUEsRUFDakI7RUFJTDtFQUNFLGVBQWU7RUFDZixVQUFVLEVBQUE7RUFGWjtJQUtJLGNBQWMsRUFBQTtFQUlsQjtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsOEJBQThCO0VBQzlCLFlBQVksRUFBQTtFQUpkO0lBT0ksY0FBYyxFQUFBO0VBUGxCO0lBV0ksY0FBYztJQUNkLGdCQUFnQjtJQUNoQix1QkFBdUI7SUFDdkIsZ0JBQWdCLEVBQUE7RUFJcEI7RUFLTSxnQkFBZ0IsRUFBQTtFQUx0QjtFQVNNLGNBQWM7RUFDZCxZQUFZO0VBQ1osZ0JBQWdCLEVBQUE7RUFLdEI7RUFLTSxnQkFBZ0IsRUFBQTtFQUt0QjtFQUtNLGNBQWM7RUFDZCxlQUFlLEVBQUE7RUFLckI7RUFDRSxnQkFBZ0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGVudC1yb3cge1xyXG4gIG1hcmdpbi10b3A6IDRyZW07XHJcblxyXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA5OTEuOThweCkge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHJcbiAgICAuY29udGVudC1jb2w6bm90KDpmaXJzdC1jaGlsZCkge1xyXG4gICAgICBtYXJnaW4tdG9wOiA0cmVtO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLnRhYnMge1xyXG4gIG1hcmdpbjogMCAtMnJlbTtcclxuICBwYWRkaW5nOiAwO1xyXG5cclxuICAudGFiIHtcclxuICAgIG1hcmdpbjogMCAycmVtO1xyXG4gIH1cclxufVxyXG5cclxuLmNhcmQtY29udGVudC1yb3cge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgaGVpZ2h0OiA0cmVtO1xyXG5cclxuICBsYWJlbCB7XHJcbiAgICBmbGV4OiAxIDAgYXV0bztcclxuICB9XHJcblxyXG4gIHNwYW4sIGEge1xyXG4gICAgZmxleDogMCAxIDEwMCU7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIH1cclxufVxyXG5cclxuLm5ldHdvcmstY2FyZCB7XHJcblxyXG4gIC5jYXJkLWNvbnRlbnQtcm93IHtcclxuXHJcbiAgICBzcGFuIHtcclxuICAgICAgbWF4LXdpZHRoOiAxMnJlbTtcclxuICAgIH1cclxuXHJcbiAgICBhIHtcclxuICAgICAgY29sb3I6ICM2NGRkZTI7XHJcbiAgICAgIHdpZHRoOiAxMnJlbTtcclxuICAgICAgbWF4LXdpZHRoOiAxMnJlbTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5wb29sLWNhcmQge1xyXG5cclxuICAuY2FyZC1jb250ZW50LXJvdyB7XHJcblxyXG4gICAgc3BhbiB7XHJcbiAgICAgIG1heC13aWR0aDogMTByZW07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4uY29uZmlnLWNhcmQge1xyXG5cclxuICAuY2FyZC1jb250ZW50LXJvdyB7XHJcblxyXG4gICAgc3BhbiB7XHJcbiAgICAgIGNvbG9yOiAjNjRkZGUyO1xyXG4gICAgICBtYXgtd2lkdGg6IDNyZW07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4ud3JhcC10YWJsZSB7XHJcbiAgb3ZlcmZsb3cteDogYXV0bztcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angular_highcharts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-highcharts */ "./node_modules/angular-highcharts/fesm5/angular-highcharts.js");
/* harmony import */ var _helpers_services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_helpers/services/api.service */ "./src/app/_helpers/services/api.service.ts");




var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(service) {
        this.service = service;
        this.activeChartTab = 'hashrate';
        this.activeTableTab = 'blocks';
        this.chartsData = {
            hashRate: [],
            difficulty: [],
            effort: []
        };
    }
    DashboardComponent_1 = DashboardComponent;
    DashboardComponent.drawChart = function (chartData, chartColorSeriesRGB) {
        var chartColor = '#0c68cc';
        var chartColorSeries = 'rgb(' + chartColorSeriesRGB + ')';
        var pointStyle = 'background-color: rgba(' + chartColorSeriesRGB + ', 0.55);';
        pointStyle = pointStyle + ' font-size: 12px;';
        pointStyle = pointStyle + ' color: white;';
        pointStyle = pointStyle + ' border-radius: 5px;';
        pointStyle = pointStyle + ' padding: 0 5px;';
        pointStyle = pointStyle + ' box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16)';
        var point = '<div style="' + pointStyle + '">{point.y} {point.x:%d %b, %H:%M GMT}</div>';
        return new angular_highcharts__WEBPACK_IMPORTED_MODULE_2__["Chart"]({
            title: { text: '' },
            credits: { enabled: false },
            exporting: { enabled: false },
            legend: { enabled: false },
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
    };
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getDashboard().subscribe(function (data) {
            _this.network = data['network'];
            _this.pool = data['pool'];
            _this.charts = data['charts'];
            _this.charts.forEach(function (item) {
                var itemDate = new Date(item.time).getTime();
                _this.chartsData.hashRate.unshift([itemDate, item.hashRate]);
                _this.chartsData.difficulty.unshift([itemDate, item.difficulty]);
                _this.chartsData.effort.unshift([itemDate, item.effort]);
            });
            _this.hashRateChart = DashboardComponent_1.drawChart(_this.chartsData.hashRate, '100, 221, 226');
            _this.difficultyChart = DashboardComponent_1.drawChart(_this.chartsData.difficulty, '49, 155, 251');
            _this.effortChart = DashboardComponent_1.drawChart(_this.chartsData.effort, '100, 221, 226');
        });
        this.service.getBlocks().subscribe(function (data) {
            _this.blocks = data[1];
        });
    };
    var DashboardComponent_1;
    DashboardComponent = DashboardComponent_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.scss */ "./src/app/dashboard/dashboard.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_helpers_services_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/docs/docs.component.html":
/*!******************************************!*\
  !*** ./src/app/docs/docs.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content-row\" style=\"margin-top: 4rem\">\r\n  <div class=\"content-col\">\r\n    <div class=\"card\">\r\n      <div class=\"card-header\">\r\n        <ul class=\"tabs\">\r\n          <li class=\"tab\" [class.active]=\"true\">\r\n            <button>Blocks</button>\r\n          </li>\r\n          <li class=\"tab\" [class.active]=\"false\">\r\n            <button>Payments</button>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div class=\"card-content\"></div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/docs/docs.component.scss":
/*!******************************************!*\
  !*** ./src/app/docs/docs.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".content-row {\n  margin-top: 4rem; }\n\n.tabs {\n  margin: 0 -2rem;\n  padding: 0; }\n\n.tabs .tab {\n    margin: 0 2rem; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jcy9EOlxcYm9vbF9wb29sL3NyY1xcYXBwXFxkb2NzXFxkb2NzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCLEVBQUE7O0FBR2xCO0VBQ0UsZUFBZTtFQUNmLFVBQVUsRUFBQTs7QUFGWjtJQUtJLGNBQWMsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2RvY3MvZG9jcy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250ZW50LXJvdyB7XHJcbiAgbWFyZ2luLXRvcDogNHJlbTtcclxufVxyXG5cclxuLnRhYnMge1xyXG4gIG1hcmdpbjogMCAtMnJlbTtcclxuICBwYWRkaW5nOiAwO1xyXG5cclxuICAudGFiIHtcclxuICAgIG1hcmdpbjogMCAycmVtO1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/docs/docs.component.ts":
/*!****************************************!*\
  !*** ./src/app/docs/docs.component.ts ***!
  \****************************************/
/*! exports provided: DocsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocsComponent", function() { return DocsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var DocsComponent = /** @class */ (function () {
    function DocsComponent() {
    }
    DocsComponent.prototype.ngOnInit = function () {
    };
    DocsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-docs',
            template: __webpack_require__(/*! ./docs.component.html */ "./src/app/docs/docs.component.html"),
            styles: [__webpack_require__(/*! ./docs.component.scss */ "./src/app/docs/docs.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DocsComponent);
    return DocsComponent;
}());



/***/ }),

/***/ "./src/app/stats/stats.component.html":
/*!********************************************!*\
  !*** ./src/app/stats/stats.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content-row\" style=\"margin-top: 4rem\">\r\n  <div class=\"content-col\">\r\n    <div class=\"card\">\r\n      <div class=\"card-header\">\r\n        <ul class=\"tabs\">\r\n          <li class=\"tab\" [class.active]=\"true\">\r\n            <button>Blocks</button>\r\n          </li>\r\n          <li class=\"tab\" [class.active]=\"false\">\r\n            <button>Payments</button>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div class=\"card-content\"></div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/stats/stats.component.scss":
/*!********************************************!*\
  !*** ./src/app/stats/stats.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".content-row {\n  margin-top: 4rem; }\n\n.tabs {\n  margin: 0 -2rem;\n  padding: 0; }\n\n.tabs .tab {\n    margin: 0 2rem; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3RhdHMvRDpcXGJvb2xfcG9vbC9zcmNcXGFwcFxcc3RhdHNcXHN0YXRzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCLEVBQUE7O0FBR2xCO0VBQ0UsZUFBZTtFQUNmLFVBQVUsRUFBQTs7QUFGWjtJQUtJLGNBQWMsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3N0YXRzL3N0YXRzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRlbnQtcm93IHtcclxuICBtYXJnaW4tdG9wOiA0cmVtO1xyXG59XHJcblxyXG4udGFicyB7XHJcbiAgbWFyZ2luOiAwIC0ycmVtO1xyXG4gIHBhZGRpbmc6IDA7XHJcblxyXG4gIC50YWIge1xyXG4gICAgbWFyZ2luOiAwIDJyZW07XHJcbiAgfVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/stats/stats.component.ts":
/*!******************************************!*\
  !*** ./src/app/stats/stats.component.ts ***!
  \******************************************/
/*! exports provided: StatsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatsComponent", function() { return StatsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var StatsComponent = /** @class */ (function () {
    function StatsComponent() {
    }
    StatsComponent.prototype.ngOnInit = function () {
    };
    StatsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-stats',
            template: __webpack_require__(/*! ./stats.component.html */ "./src/app/stats/stats.component.html"),
            styles: [__webpack_require__(/*! ./stats.component.scss */ "./src/app/stats/stats.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], StatsComponent);
    return StatsComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\bool_pool\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map