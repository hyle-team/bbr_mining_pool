import {Component, OnInit} from '@angular/core';
import {ApiService} from './_helpers/services/api.service';
import {Router, Event, NavigationEnd} from '@angular/router';
import {ModalService} from './_helpers/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  navIsOpen: boolean;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private modalService: ModalService) {
    this.navIsOpen = false;

    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.navIsOpen === true) {
          this.navIsOpen = false;
        }
      }
    });
  }

  ngOnInit() {

  }

  // modal
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  toggleMobileNav() {
    this.navIsOpen = this.navIsOpen !== true;
  }

}
