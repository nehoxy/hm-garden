import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  posts = [
    {
      profileImage: 'ruta/imagen_perfil.jpg',
      username: 'usuario1',
      timestamp: 'hace 1 hora',
      postImage: 'https://cdn.shopify.com/s/files/1/0150/6262/products/the_sill-variant-white_gloss-money_tree.jpg?v=1680542101',
      caption: 'Descripción de la publicación...',
      likes: 10,
      comments: 5,
    },
  ]
  constructor() {}

}
