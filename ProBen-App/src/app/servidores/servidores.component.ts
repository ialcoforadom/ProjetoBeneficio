import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Servidor } from '../_models/Servidor';
import { ServidorService } from '../_service/Servidor.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-servidores',
  templateUrl: './servidores.component.html',
  styleUrls: ['./servidores.component.scss']
})
export class ServidoresComponent implements OnInit {
  titulo = 'Servidores';
  
  servidoresFiltrados!: Servidor[];
  servidores!: Servidor[];
  
  servidor!: Servidor;
  modoSalvar = 'post';
  dataCriacao!: string;
  
  registerForm!: FormGroup;
  bodyDeletarServidor = '';
  
  dataAtual!: string;
  
  _filtroLista!: string;
  
  constructor(
    private servidorService: ServidorService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localService: BsLocaleService,
    private toastr : ToastrService
    ) { 
      this.localService.use('pt-br');
    }
    
    get filtroLista(): string{
      return this._filtroLista;
    }
    set filtroLista(value: string){
      this._filtroLista = value;
      this.servidoresFiltrados = this.filtroLista ? this.filtrarServidores(this.filtroLista) : this.servidores;
    }

    filtrarServidores(filtrarPor: string): Servidor[]{
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.servidores.filter(
        (      servidor: { nome: string; }) => servidor.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }

      editarServidores(servidor: Servidor, template: any) {
        this.modoSalvar = 'put';
        this.openModal(template);
        this.servidor = Object.assign({}, servidor);
        this.registerForm.patchValue(this.servidor);
      }

      openModal(template: any){
        this.registerForm.reset();
        template.show();
      }

      novoServidor(template: any){
        this.modoSalvar = 'post';
        this.openModal(template);
      }
      
      ngOnInit() {
        this.validation();
        this.getServidores();
      }

      validation(){
        this.registerForm = this.fb.group({
          nome: ['', [Validators.required, Validators.minLength(4)]],
          cpf: ['', [Validators.required]],
          beneficioId: [''],
          matricula: ['', [Validators.required]],
          telefone: [''],
          dataCriacao: ['', Validators.required],
          email: ['', [Validators.email]]
        });
      }

      getServidores() {
        this.dataAtual = new Date().getMilliseconds().toString();
        
        this.servidorService.getAllServidor().subscribe(
          (_servidores: Servidor[]) => {
            this.servidores = _servidores;
            this.servidoresFiltrados = this.servidores;
            console.log(this.servidores);
          }, error => {
            this.toastr.error(`Erro ao tentar Carregar servidores: ${error}`);
          });
        }

        salvarAlteracao(template: any) {
          if (this.registerForm.valid) {
            if (this.modoSalvar == "post"){
              this.servidor = Object.assign({}, this.registerForm.value);
              
              this.servidorService.postServidor(this.servidor).subscribe(
                (novoServidor: Servidor) => { 
                  console.log(novoServidor);
                  template.hide();
                  this.getServidores();
                  this.toastr.success('Inserido com Sucesso!');
                }, error => {
                  this.toastr.error(`Erro ao inserir: ${error}`);
                }
                );
              } else {
                this.servidor = Object.assign({id: this.servidor.id}, this.registerForm.value);
                
                this.servidorService.putServidor(this.servidor).subscribe(
                  () => { 
                    template.hide();
                    this.getServidores();
                    this.toastr.success('Editado com Sucesso!');
                  }, error => {
                    this.toastr.error(`Erro ao editar: ${error}`);
                  }
                  );
                }
              }
            }

            excluirServidor(servidor: Servidor, template: any){
              this.openModal(template);
              this.servidor = servidor;
              this.bodyDeletarServidor = `Tem certeza que deseja excluir o Servidor: ${servidor.nome}, Código: ${servidor.id}`;
            }

            confirmeDelete(template: any){
              this.servidorService.deleteServidor(this.servidor.id).subscribe(
                () => {
                  template.hide();
                  this.getServidores();
                  this.toastr.success('Deletado com Sucesso');
                }, error => {
                  this.toastr.error('Erro ao tentar deletar');
                }
                )
              }
      
    }
    