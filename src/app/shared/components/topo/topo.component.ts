import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'dio-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TopoComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  title: string;

  constructor() {     

}

  ngOnInit() {
  }

  changeTitle(title: string) {
    this.title = title;
  }

  openSideNav() {
    this.sidenav.open();
  }

  closeSideNav() {
    this.sidenav.close();
  }


}
