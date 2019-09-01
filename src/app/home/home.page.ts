import { Component } from '@angular/core';
import { delay } from 'q';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  seleccion: any;
  seg: number;
  arr: string [];
  lista: string;
  palabra: string;
  ejemplos: Array<any> = [
    {
      nombre: 'Numeros',
      contenido: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16'
    },
    {
      nombre: 'Comidas',
      contenido: 'Sopa, Pasta, Hamburguesa, Perro Caliente, Pizza, Lasagna, Ensalda, Arroz'
    },
    {
      nombre: 'Familia',
      contenido: 'Madre, Padre, Hijo, Hija, Tio, Tia, Abuelo, Abuela, Nieto, Nieta'
    },
    {
      nombre: 'Colores',
      contenido: 'Amarillo, Azul, Rojo, Naranja, Verde, Violeta, Gris, Cafe, Lima, Blanco, Negro'
    }
  ];

  constructor(private alert: AlertController) {
  }

  ionViewWillEnter() {
    this.arr = new Array<string>();
    this.seg = 1;
  }

  async randomElement() {
    let copy = this.seg * 10;
    this.arr = this.lista.split(',');
    while (true) {
      const rd = Math.floor(Math.random() * this.arr.length - 1) + 1;
      await delay( this.palabra = this.arr[rd], 90);
      if (--copy === 0) {
        break;
      }
    }
    this.presentAlert();
  }

  async borrar() {
    const alert = await this.alert.create({
      animated: true,
      header: '¿Seguro que desea borrar el texto?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Borrar',
          handler: () => {
            this.lista = '';
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alert.create({
      message: this.palabra,
      buttons: ['Listo']
    });

    await alert.present();
  }
}
