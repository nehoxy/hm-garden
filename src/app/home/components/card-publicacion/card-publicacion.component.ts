import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-publicacion',
  templateUrl: './card-publicacion.component.html',
  styleUrls: ['./card-publicacion.component.scss'],
})
export class CardPublicacionComponent  implements OnInit {
  @Input() profileImage!: string;
  @Input() username!: string;
  @Input() timestamp!: string;
  @Input() postImage!: string;
  @Input() caption!: string;
  @Input() likes!: number;
  @Input() comments!: number;

  constructor() { }

  ngOnInit() {}

  likePost() {
    // Lógica para manejar "Me gusta"
  }

  commentPost() {
    // Lógica para manejar comentarios
  }
}
