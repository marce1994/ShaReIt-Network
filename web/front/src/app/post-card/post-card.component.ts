import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';
import {Post} from '../models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input() post: Post;

  constructor() {
    this.post = new Post();
  }

  private fill(result){
    console.log(result);
    var obj = JSON.parse(result[0].json_metadata).profile;
    console.log(obj.profile_image);
    this.post.profile_image = obj.profile_image;
  }

  ngOnInit() {
    this.post.author = 'pablobianco';
    this.post.permlink = 'pablobianco';
    this.post.profile_image = 'https://logopond.com/logos/438b938e710d4c9d462866f48257c07e.png';
    this.post.body = 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.';
    this.post.image = 'https://theworldwentaway.files.wordpress.com/2013/07/oreimo-happy-end.jpg';
    this.post.title = 'Ore no imouto wake ga nai';
    //steem.api.getAccounts(['pablobianco'], (err, res) => this.fill(res));
  }

  hello(){
    console.log("hola pt");
  }
}
