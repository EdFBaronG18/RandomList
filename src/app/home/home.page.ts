import { Component } from '@angular/core';
import { delay } from 'q';
import { AlertController, ActionSheetController} from '@ionic/angular';

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
      contenido: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16',
      icon: 'logo-slack'
    },
    {
      nombre: 'Comidas',
      contenido: 'Sopa, Pasta, Hamburguesa, Perro Caliente, Pizza, Lasagna, Ensalda, Arroz',
      icon: 'pizza'
    },
    {
      nombre: 'Familia',
      contenido: 'Madre, Padre, Hijo, Hija, Tio, Tia, Abuelo, Abuela, Nieto, Nieta',
      icon: 'contacts'
    },
    {
      nombre: 'Colores',
      contenido: 'Amarillo, Azul, Rojo, Naranja, Verde, Violeta, Gris, Cafe, Lima, Blanco, Negro',
      icon: 'color-palette'
    }
  ];

  constructor(private alert: AlertController, private actionSheetController: ActionSheetController) {
  }

  ionViewWillEnter() {
    this.arr = new Array<string>();
    this.palabra = 'Juega!';
    this.seg = 1;
  }

  async randomElement() {
    let copy = this.seg * 10;
    if (this.lista != null && this.lista.trim() !== '') {
      this.arr = this.lista.split(',');
      while (true) {
        const rd = Math.floor(Math.random() * this.arr.length - 1) + 1;
        await delay( this.palabra = this.arr[rd], 90);
        if (--copy === 0) {
          break;
        }
      }
      // this.resultado();
    } else {
      const alert = await this.alert.create({
        header: '¡Error!',
        animated: true,
        backdropDismiss: false,
        message: 'Por favor ingrese palabras primero o use un ejemplo.',
        buttons: ['Listo']
      });
      await alert.present();
    }
  }

  valor() {
    console.log(this.seleccion);
  }

  async borrar() {
    const alert = await this.alert.create({
      animated: true,
      backdropDismiss: false,
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
            this.lista = null;
            this.palabra = 'Juega!';
          }
        }
      ]
    });
    await alert.present();
  }

  // async resultado() {
  //   const alert = await this.alert.create({
  //     header: 'Resultado',
  //     animated: true,
  //     backdropDismiss: false,
  //     message: this.palabra,
  //     buttons: ['Listo']
  //   });

  //   await alert.present();
  // }

  async info() {
    const alert = await this.alert.create({
          header: 'Autores',
          animated: true,
          backdropDismiss: false,
          message: 'Edward Fabian Baron <br> Marlon Alexander Estupiñan',
          buttons: ['Listo']
        });
    await alert.present();
  }

  async ejemplosOpciones() {
    const botones: Array<any> = [];
    for (const ejemplo of this.ejemplos) {
      botones.push(
        {
          text: ejemplo.nombre,
          icon: ejemplo.icon,
          cssClass: 'font',
          handler: () => {
          this.lista = ejemplo.contenido;
        }});
    }

    botones.push(
      {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'font',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    );

    const actionSheet = await this.actionSheetController.create({
      header: 'Ejemplos',
      backdropDismiss: false,
      buttons: botones
    });
    await actionSheet.present();
  }
}
