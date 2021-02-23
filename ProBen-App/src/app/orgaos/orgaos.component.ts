import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Orgao } from '../_models/Orgao';
import { OrgaoService } from '../_service/Orgao.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orgaos',
  templateUrl: './orgaos.component.html',
  styleUrls: ['./orgaos.component.scss']
})
export class OrgaosComponent implements OnInit {
  titulo = "Órgãos";
  
  orgaosFiltrados!: Orgao[];
  orgaos!: Orgao[];
  
  orgao!: Orgao;
  modoSalvar = 'post';
  dataCriacao!: string;
  
  registerForm!: FormGroup;
  bodyDeletarOrgao = '';
  
  dataAtual!: string;
  
  _filtroLista!: string;

  constructor(
    private orgaoService: OrgaoService,
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
      this.orgaosFiltrados = this.filtroLista ? this.filtrarOrgaos(this.filtroLista) : this.orgaos;
    }

    filtrarOrgaos(filtrarPor: string): Orgao[]{
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.orgaos.filter(
        (      orgao: { nome: string; }) => orgao.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      editarOrgaos(orgao: Orgao, template: any) {
        this.modoSalvar = 'put';
        this.openModal(template);
        this.orgao = Object.assign({}, orgao);
        this.registerForm.patchValue(this.orgao);
      }

      openModal(template: any){
        this.registerForm.reset();
        template.show();
      }
      novoOrgao(template: any){
        this.modoSalvar = 'post';
        this.openModal(template);
      }
      
      ngOnInit() {
        this.validation();
        this.getOrgaos();
      }

      validation(){
        this.registerForm = this.fb.group({
          nome: ['', [Validators.required, Validators.minLength(4)]],
          dataCriacao: ['', Validators.required],
          servidorId: ['']
        });
      }

      getOrgaos() {
        this.dataAtual = new Date().getMilliseconds().toString();
        
        this.orgaoService.getAllOrgao().subscribe(
          (_orgaos: Orgao[]) => {
            this.orgaos = _orgaos;
            this.orgaosFiltrados = this.orgaos;
            console.log(this.orgaos);
          }, error => {
            this.toastr.error(`Erro ao tentar Carregar Orgaos: ${error}`);
          });
        }

        salvarAlteracao(template: any) {
          if (this.registerForm.valid) {
            if (this.modoSalvar == "post"){
              this.orgao = Object.assign({}, this.registerForm.value);
              
              this.orgaoService.postOrgao(this.orgao).subscribe(
                (novoOrgao: Orgao) => { 
                  console.log(novoOrgao);
                  template.hide();
                  this.getOrgaos();
                  this.toastr.success('Inserido com Sucesso!');
                }, error => {
                  this.toastr.error(`Erro ao inserir: ${error}`);
                }
                );
              } else {
                this.orgao = Object.assign({id: this.orgao.id}, this.registerForm.value);
                
                this.orgaoService.putOrgao(this.orgao).subscribe(
                  () => { 
                    template.hide();
                    this.getOrgaos();
                    this.toastr.success('Editado com Sucesso!');
                  }, error => {
                    this.toastr.error(`Erro ao editar: ${error}`);
                  }
                  );
                }
              }
            }

            excluirOrgaos(orgao: Orgao, template: any){
              this.openModal(template);
              this.orgao = orgao;
              this.bodyDeletarOrgao = `Tem certeza que deseja excluir o Órgão: ${orgao.nome}, Código: ${orgao.id}`;
            }

            confirmeDelete(template: any){
              this.orgaoService.deleteOrgao(this.orgao.id).subscribe(
                () => {
                  template.hide();
                  this.getOrgaos();
                  this.toastr.success('Deletado com Sucesso');
                }, error => {
                  this.toastr.error('Erro ao tentar deletar');
                }
                )
              }

}
