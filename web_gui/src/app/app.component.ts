import {Component, OnInit} from '@angular/core';
import {ApiService} from './_helpers/services/api.service';
import {Router, Event, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  navIsOpen: boolean;

  constructor(private apiService: ApiService, private router: Router) {
    this.navIsOpen = false;

    router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.navIsOpen === true) {
          this.navIsOpen = false;
        }
      }
    });

    this.apiService.getDashboard().subscribe(
      data => {
        // console.log(data);
      },
      err => console.error(err)
    );
    this.apiService.getBlocks().subscribe(
      data => {
        // console.log(data);
      },
      err => console.error(err)
    );
    this.apiService.getTx('1CR7PTbKuA42P43d4rYmTq8f2i4hqHV7uaW1LFietAGBY3K9vanbstrAx3NtBecmfxA3S7yCSTUG1LthdgukBAoEDk6xwuF').subscribe(
      data => {
        // console.log(data);
      },
      err => console.error(err)
    );
    this.apiService.getBalance('1CR7PTbKuA42P43d4rYmTq8f2i4hqHV7uaW1LFietAGBY3K9vanbstrAx3NtBecmfxA3S7yCSTUG1LthdgukBAoEDk6xwuF').subscribe(
      data => {
        // console.log(data);
      },
      err => console.error(err)
    );
    this.apiService.setAlias('1CR7PTbKuA42P43d4rYmTq8f2i4hqHV7uaW1LFietAGBY3K9vanbstrAx3NtBecmfxA3S7yCSTUG1LthdgukBAoEDk6xwuF', 'newAlias').subscribe(
      data => {
        // console.log(data);
      },
      err => console.error(err)
    );
    this.apiService.checkAlias('newAlias').subscribe(
      data => {
        // console.log(data);
      },
      err => console.error(err)
    );
    this.apiService.getAliasQueue().subscribe(
      data => {
        // console.log(data);
      },
      err => console.error(err)
    );
    this.apiService.getMiner('1CR7PTbKuA42P43d4rYmTq8f2i4hqHV7uaW1LFietAGBY3K9vanbstrAx3NtBecmfxA3S7yCSTUG1LthdgukBAoEDk6xwuF').subscribe(
      data => {
        // console.log(data);
      },
      err => console.error(err)
    );
  }

  ngOnInit() {

  }

  toggleMobileNav() {
    this.navIsOpen = this.navIsOpen !== true;
  }

}
