import { Component, OnInit, Input } from '@angular/core';
import { CrudPublicacionService } from 'src/app/publicar/services/crud-publicacion.service';

@Component({
  selector: 'app-card-publicacion',
  templateUrl: './card-publicacion.component.html',
  styleUrls: ['./card-publicacion.component.scss'],
})
export class CardPublicacionComponent  implements OnInit {
  @Input() titulo!: string;
  @Input() descripcion!: string;
  @Input() imagen!: string;
  @Input() date_hour!: string;
  @Input() usuario!: string;

  
  constructor() { }

  ngOnInit() {
  
  }

  likePost() {
    // Lógica para manejar "Me gusta"
  }

  commentPost() {
    // Lógica para manejar comentarios
  }
}
