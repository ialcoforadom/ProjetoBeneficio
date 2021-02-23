import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Beneficio } from '../_models/Beneficio';
import { BeneficioService } from '../_service/Beneficio.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-beneficios',
  templateUrl: './beneficios.component.html',
  styleUrls: ['./beneficios.component.css']
})
export class BeneficiosComponent implements OnInit {
  titulo = 'Benefícios';
  
  beneficiosFiltrados!: Beneficio[];
  beneficios!: Beneficio[];
  
  beneficio!: Beneficio;
  modoSalvar = 'post';
  dataCriacao!: string;
  
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm!: FormGroup;
  bodyDeletarBeneficio = '';
  
  file!: File;
  fileNameToUpdate!: string;
  
  dataAtual!: string;
  
  _filtroLista!: string;
  
  constructor(
    private beneficioService: BeneficioService,
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
      this.beneficiosFiltrados = this.filtroLista ? this.filtrarBeneficios(this.filtroLista) : this.beneficios;
    }
    
    editarBeneficio(beneficio: Beneficio, template: any) {
      this.modoSalvar = 'put';
      this.openModal(template);
      this.beneficio = Object.assign({}, beneficio);
      this.fileNameToUpdate = this.beneficio.imagemUrl.toString();
      this.beneficio.imagemUrl = '';
      this.registerForm.patchValue(this.beneficio);
    }
    
    novoBenenfico(template: any){
      this.modoSalvar = 'post';
      this.openModal(template);
    }
    
    openModal(template: any){
      this.registerForm.reset();
      template.show();
    }
    
    ngOnInit() {
      this.validation();
      this.getBeneficios();
    }
    
    filtrarBeneficios(filtrarPor: string): Beneficio[]{
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.beneficios.filter(
        (      beneficio: { nome: string; }) => beneficio.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
      alternarArquivo() {
        this.mostrarImagem = !this.mostrarImagem;
      }
      
      validation(){
        this.registerForm = this.fb.group({
          nome: ['', [Validators.required, Validators.minLength(4)]],
          dataCriacao: ['', Validators.required],
          imagemUrl: []
        });
      }
      
      uploadArquivo() {
        
        const nomeArquivo = this.beneficio.imagemUrl.split('\\', 3);
        this.beneficio.imagemUrl = nomeArquivo[2];
        
        this.beneficioService.postUpload(this.file, nomeArquivo[2]).subscribe();
      }
      
      salvarAlteracao(template: any) {
        if (this.registerForm.valid) {
          if (this.modoSalvar == "post"){
            this.beneficio = Object.assign({}, this.registerForm.value);
            
            this.uploadArquivo();
            
            this.beneficioService.postBeneficio(this.beneficio).subscribe(
              (novoBeneficio: Beneficio) => { 
                console.log(novoBeneficio);
                template.hide();
                this.getBeneficios();
                this.toastr.success('Inserido com Sucesso!');
              }, error => {
                this.toastr.error(`Erro ao inserir: ${error}`);
              }
              );
            } else {
              this.beneficio = Object.assign({id: this.beneficio.id}, this.registerForm.value);
              
              this.uploadArquivo();
              
              this.beneficioService.putBeneficio(this.beneficio).subscribe(
                () => { 
                  template.hide();
                  this.getBeneficios();
                  this.toastr.success('Editado com Sucesso!');
                }, error => {
                  this.toastr.error(`Erro ao editar: ${error}`);
                }
                );
              }
            }
          }
          
          onFileChange(event: any){
            const reader = new FileReader();
            
            if(event.target.files && event.target.files.length){
              this.file = event.target.files;
              console.log(this.file);
            }
          }
          
          excluirBeneficio(beneficio: Beneficio, template: any){
            this.openModal(template);
            this.beneficio = beneficio;
            this.bodyDeletarBeneficio = `Tem certeza que deseja excluir o Benefício: ${beneficio.nome}, Código: ${beneficio.id}`;
          }
          
          confirmeDelete(template: any){
            this.beneficioService.deleteBeneficio(this.beneficio.id).subscribe(
              () => {
                template.hide();
                this.getBeneficios();
                this.toastr.success('Deletado com Sucesso');
              }, error => {
                this.toastr.error('Erro ao tentar deletar');
              }
              )
            }
            
            getBeneficios() {
              this.dataAtual = new Date().getMilliseconds().toString();
              
              this.beneficioService.getAllBeneficio().subscribe(
                (_beneficios: Beneficio[]) => {
                  this.beneficios = _beneficios;
                  this.beneficiosFiltrados = this.beneficios;
                  console.log(this.beneficios);
                }, error => {
                  this.toastr.error(`Erro ao tentar Carregar benefício: ${error}`);
                });
              }
              
            }
            