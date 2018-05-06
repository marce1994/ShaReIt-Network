import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';
import * as steem from 'steem';
import {Publication} from '../models/publication';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  @Input() publication: Publication;

  constructor() {
    this.publication = new Publication();
  }

  private fill(result){
    console.log(result);
    var obj = JSON.parse(result[0].json_metadata);
    console.log(obj);
    this.publication.profile_image = result.profile.profile_image;
    console.log(this.publication.profile_image);
  }

  ngOnInit() {
    this.publication.author = 'pablobianco';
    this.publication.permlink = '';
    this.publication.body = 'the best publication ever';
    this.publication.image = 'https://theworldwentaway.files.wordpress.com/2013/07/oreimo-happy-end.jpg';
    this.publication.title = 'Ore no imouto wake ga nai';
    steem.api.getAccounts(['pablobianco'], (err, res) => this.fill(res));
  }

}
