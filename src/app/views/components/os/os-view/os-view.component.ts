import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.component.html',
  styleUrls: ['./os-view.component.css']
})

export class OsViewComponent implements OnInit {

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    prioridade: '',
    status: '' 
  }

  constructor(
      private service: OsService, 
      private clienteSevice: ClienteService,
      private tecnicoService: TecnicoService,
      private route: ActivatedRoute,
      private router: Router) { }

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.service.findById(this.os.id).subscribe (resposta => {
      //this.os = resposta;
      this.findOrdemServico();
    })
  }

  findOrdemServico():void {
    this.service.findById(this.os.id).subscribe (resposta => {
      this.os = resposta;
      this.findClienteById();
      this.findTecnicoById();
    })
  }

  findClienteById(): void {
    this.clienteSevice.findById(this.os.cliente).subscribe (resposta => {
      this.os.cliente = resposta.nome;      
    })
  }

  findTecnicoById(): void {
    this.tecnicoService.findById(this.os.tecnico).subscribe (resposta => {
      this.os.tecnico = resposta.nome;      
    })
  }

  return(): void {
    this.router.navigate(['os'])
  }

}
