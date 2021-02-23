import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Categoria } from '../_models/Categoria';
import { CategoriaService } from '../_service/Categoria.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  titulo = "Categorias";
  
  categoriasFiltradas!: Categoria[];
  categorias!: Categoria[];
  
  categoria!: Categoria;
  modoSalvar = 'post';
  dataCriacao!: string;
  
  registerForm!: FormGroup;
  bodyDeletarCategoria = '';
  
  dataAtual!: string;
  
  _filtroLista!: string;

  constructor(
    private categoriaService: CategoriaService,
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
      this.categoriasFiltradas = this.filtroLista ? this.filtrarCategoria(this.filtroLista) : this.categorias;
    }

    filtrarCategoria(filtrarPor: string): Categoria[]{
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.categorias.filter(
        (      categoria: { nome: string; }) => categoria.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
    
      editarCategoria(categoria: Categoria, template: any) {
        this.modoSalvar = 'put';
        this.openModal(template);
        this.categoria = Object.assign({}, categoria);
        this.registerForm.patchValue(this.categoria);
      }

      openModal(template: any){
        this.registerForm.reset();
        template.show();
      }
      novaCategoria(template: any){
        this.modoSalvar = 'post';
        this.openModal(template);
      }
      
      ngOnInit() {
        this.validation();
        this.getCategorias();
      }

      validation(){
        this.registerForm = this.fb.group({
          nome: ['', [Validators.required, Validators.minLength(4)]],
          dataCriacao: ['', Validators.required],
          beneficioId: ['']
        });
      }

      getCategorias() {
        this.dataAtual = new Date().getMilliseconds().toString();
        
        this.categoriaService.getAllCategoria().subscribe(
          (_categorias: Categoria[]) => {
            this.categorias = _categorias;
            this.categoriasFiltradas = this.categorias;
            console.log(this.categorias);
          }, error => {
            this.toastr.error(`Erro ao tentar Carregar Categorias: ${error}`);
          });
        }

        salvarAlteracao(template: any) {
          if (this.registerForm.valid) {
            if (this.modoSalvar == "post"){
              this.categoria = Object.assign({}, this.registerForm.value);
              
              this.categoriaService.postCategoria(this.categoria).subscribe(
                (novaCategoria: Categoria) => { 
                  console.log(novaCategoria);
                  template.hide();
                  this.getCategorias();
                  this.toastr.success('Inserido com Sucesso!');
                }, error => {
                  this.toastr.error(`Erro ao inserir: ${error}`);
                }
                );
              } else {
                this.categoria = Object.assign({id: this.categoria.id}, this.registerForm.value);
                
                this.categoriaService.putCategoria(this.categoria).subscribe(
                  () => { 
                    template.hide();
                    this.getCategorias();
                    this.toastr.success('Editado com Sucesso!');
                  }, error => {
                    this.toastr.error(`Erro ao editar: ${error}`);
                  }
                  );
                }
              }
            }

            excluirCategorias(categoria: Categoria, template: any){
              this.openModal(template);
              this.categoria = categoria;
              this.bodyDeletarCategoria = `Tem certeza que deseja excluir a Categoria: ${categoria.nome}, Código: ${categoria.id}`;
            }

            confirmeDelete(template: any){
              this.categoriaService.deleteCategoria(this.categoria.id).subscribe(
                () => {
                  template.hide();
                  this.getCategorias();
                  this.toastr.success('Deletado com Sucesso');
                }, error => {
                  this.toastr.error('Erro ao tentar deletar');
                }
                )
              }

}
