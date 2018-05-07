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
    var obj = JSON.parse(result[0].json_metadata).profile;
    console.log(obj.profile_image);
    this.publication.profile_image = obj.profile_image;
  }

  ngOnInit() {
    this.publication.author = 'pablobianco';
    this.publication.permlink = 'pablobianco';
    this.publication.body = 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.';
    this.publication.image = 'https://theworldwentaway.files.wordpress.com/2013/07/oreimo-happy-end.jpg';
    this.publication.title = 'Ore no imouto wake ga nai';
    steem.api.getAccounts(['pablobianco'], (err, res) => this.fill(res));
  }

  hello(){
    console.log("hola pt");
  }
}
