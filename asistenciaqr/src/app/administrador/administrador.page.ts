import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {
  datos: any[] = [];
  nuevoDato: any = {
    identificador: '',
    nombre: '',
    apellido: '',
    carrera: '',
    email: '',
    password: '',
  };

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    await this.storageService.init();
    this.obtenerDatos();
  }

  async obtenerDatos() {
    try {
      this.datos = await this.storageService.obtenerDatos('miKey');
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  async agregarDato() {
    const success = await this.storageService.agregar('miKey', this.nuevoDato);
    if (success) {
      this.obtenerDatos();
      this.nuevoDato = {
        identificador: '',
        nombre: '',
        apellido: '',
        carrera: '',
        email: '',
        password: '',
      };
    } else {
      console.log('El dato ya existe.');
    }
  }

  async eliminarDato(identificador: string) {
    await this.storageService.eliminar('miKey', identificador);
    this.obtenerDatos();
  }

  async obtenerDato(identificador: string) {
    const dato = await this.storageService.obtenerDato('miKey', identificador);
    console.log(dato);
  }
}
