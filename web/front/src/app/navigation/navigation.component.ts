import { Component, OnInit } from '@angular/core';
import {MatMenuTrigger} from '@angular/material';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  title: string = "ShaReIt Network";
  add: string = "Upload";
  stats: string = "Stats";
  constructor() { }

  ngOnInit() {
  }

}
