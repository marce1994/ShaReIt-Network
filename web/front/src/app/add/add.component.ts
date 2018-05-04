import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl, MatInput } from '@angular/material';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  title: string = "Some title";
  image: string = ""
  constructor() { }

  ngOnInit() {
  }

}
