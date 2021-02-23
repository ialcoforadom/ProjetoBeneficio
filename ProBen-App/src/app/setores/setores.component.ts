import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Setor } from '../_models/Setor';
import { SetorService } from '../_service/Setor.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setores',
  templateUrl: './setores.component.html',
  styleUrls: ['./setores.component.scss']
})
export class SetoresComponent implements OnInit {
  titulo = "Setores";
  
  setoresFiltrados!: Setor[];
  setores!: Setor[];
  
  setor!: Setor;
  modoSalvar = 'post';
  dataCriacao!: string;
  
  registerForm!: FormGroup;
  bodyDeletarSetor = '';
  
  dataAtual!: string;
  
  _filtroLista!: string;

  constructor(
    private setorService: SetorService,
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
      this.setoresFiltrados = this.filtroLista ? this.filtrarSetor(this.filtroLista) : this.setores;
    }

    filtrarSetor(filtrarPor: string): Setor[]{
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.setores.filter(
        (      setor: { nome: string; }) => setor.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      editarSetores(setor: Setor, template: any) {
        this.modoSalvar = 'put';
        this.openModal(template);
        this.setor = Object.assign({}, setor);
        this.registerForm.patchValue(this.setor);
      }

      openModal(template: any){
        this.registerForm.reset();
        template.show();
      }
      novoSetor(template: any){
        this.modoSalvar = 'post';
        this.openModal(template);
      }
      
      ngOnInit() {
        this.validation();
        this.getSetores();
      }

      validation(){
        this.registerForm = this.fb.group({
          nome: ['', [Validators.required, Validators.minLength(4)]],
          dataCriacao: ['', Validators.required],
          beneficioId: ['']
        });
      }

      getSetores() {
        this.dataAtual = new Date().getMilliseconds().toString();
        
        this.setorService.getAllSetor().subscribe(
          (_setores: Setor[]) => {
            this.setores = _setores;
            this.setoresFiltrados = this.setores;
            console.log(this.setores);
          }, error => {
            this.toastr.error(`Erro ao tentar Carregar Setor: ${error}`);
          });
        }

        salvarAlteracao(template: any) {
          if (this.registerForm.valid) {
            if (this.modoSalvar == "post"){
              this.setor = Object.assign({}, this.registerForm.value);
              
              this.setorService.postSetor(this.setor).subscribe(
                (novoSetor: Setor) => { 
                  console.log(novoSetor);
                  template.hide();
                  this.getSetores();
                  this.toastr.success('Inserido com Sucesso!');
                }, error => {
                  this.toastr.error(`Erro ao inserir: ${error}`);
                }
                );
              } else {
                this.setor = Object.assign({id: this.setor.id}, this.registerForm.value);
                
                this.setorService.putSetor(this.setor).subscribe(
                  () => { 
                    template.hide();
                    this.getSetores();
                    this.toastr.success('Editado com Sucesso!');
                  }, error => {
                    this.toastr.error(`Erro ao editar: ${error}`);
                  }
                  );
                }
              }
            }

            excluirSetores(setor: Setor, template: any){
              this.openModal(template);
              this.setor = setor;
              this.bodyDeletarSetor = `Tem certeza que deseja excluir o Setor: ${setor.nome}, Código: ${setor.id}`;
            }

            confirmeDelete(template: any){
              this.setorService.deleteSetor(this.setor.id).subscribe(
                () => {
                  template.hide();
                  this.getSetores();
                  this.toastr.success('Deletado com Sucesso');
                }, error => {
                  this.toastr.error('Erro ao tentar deletar');
                }
                )
              }


}
