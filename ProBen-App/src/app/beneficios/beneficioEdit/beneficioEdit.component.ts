import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Beneficio } from 'src/app/_models/Beneficio';
import { BeneficioService } from 'src/app/_service/Beneficio.service';

@Component({
  selector: 'app-beneficio-edit',
  templateUrl: './beneficioEdit.component.html',
  styleUrls: ['./beneficioEdit.component.scss']
})
export class BeneficioEditComponent implements OnInit {
  titulo = "Editar Benefício";
  beneficio: Beneficio = new Beneficio();  
  registerForm!: FormGroup;
  @ViewChild('myInput') myInput!: ElementRef; 
  private filtro: any;
  caminhoarquivo!: string;
  imagemUrl = "asset/img/upload.png";
  file!: File;
  fileNameToUpdate!: string;

  dataAtual = '';
  
  get servidores(): FormArray {
    return <FormArray>this.registerForm.get('servidores');
  }
  get setores(): FormArray {
    return <FormArray>this.registerForm.get('setores');
  }
  get categorias(): FormArray {
    return <FormArray>this.registerForm.get('categorias');
  }
  
  constructor(
    private beneficioService: BeneficioService
    , private fb: FormBuilder
    , private localeService: BsLocaleService
    , private toastr: ToastrService
    , private router: ActivatedRoute
    ) {
      this.localeService.use('pt-br');
    }
    
    ngOnInit() {
      this.validation();
      this.carregarBeneficio();
    }
    
    carregarBeneficio() {
      const idBeneficio = Number(this.router.snapshot.paramMap.get('id'));
      this.beneficioService.getBeneficioById(idBeneficio)
        .subscribe(
          (beneficio: Beneficio) => {
            this.beneficio = Object.assign({}, beneficio);
            this.fileNameToUpdate = beneficio.imagemUrl.toString();
  
            this.imagemUrl = `http://localhost:5000/resources/pdfs/${this.beneficio.imagemUrl}?_ts=${this.dataAtual}`;
  
            this.beneficio.imagemUrl = '';
            this.registerForm.patchValue(this.beneficio);
  
            this.beneficio.servidores.forEach(servidor => {
              this.servidores.push(this.criaServidor(servidor));
            });
            this.beneficio.setores.forEach(setor => {
              this.setores.push(this.criaSetor(setor));
            });
            this.beneficio.categorias.forEach(categoria => {
              this.categorias.push(this.criaCategoria(categoria));
            });
          }
        );
    }
    
      
      validation(){
        this.registerForm = this.fb.group({
          id: [],
          nome: ['', [Validators.required, Validators.minLength(4)]],
          dataCriacao: ['', Validators.required],
          imagemUrl:[''],
          servidores: this.fb.array([]),
          setores: this.fb.array([]),
          categorias: this.fb.array([])
        });
      }
      
      salvarBeneficio() {
        this.beneficio = Object.assign({ id: this.beneficio.id }, this.registerForm.value);
        this.beneficio.imagemUrl = this.fileNameToUpdate;
        
        this.uploadImagem();
        
        this.beneficioService.putBeneficio(this.beneficio).subscribe(
          () => {
            this.toastr.success('Editado com Sucesso!');
          }, error => {
            this.toastr.error(`Erro ao Editar: ${error}`);
          }
          );
        }
        
        uploadImagem() {
          if (this.registerForm.get('imagemUrl')!.value !== '') {
            this.beneficioService.postUpload(this.file, this.fileNameToUpdate)
            .subscribe(
              () => {
                this.dataAtual = new Date().getMilliseconds().toString();
                this.imagemUrl = `http://localhost:5000/resources/pdfs/${this.beneficio.imagemUrl}?_ts=${this.dataAtual}`;
              }
              );
            }
          }
          
          //SERVIDORES    
          criaServidor(servidor: any): FormGroup {
            return this.fb.group({
              id: [servidor.id],
              nome: [servidor.nome, [Validators.required, Validators.minLength(4)]],
              cpf: [servidor.cpf, [Validators.required]],
              beneficioId: [servidor.beneficioId],
              matricula: [servidor.matricula, [Validators.required]],
              telefone: [servidor.telefone],
              dataCriacao: [servidor.dataCriacao, Validators.required],
              email: [servidor.email, [Validators.email]]});
            }
            
            adicionarServidor(){
              this.servidores.push(this.criaServidor({ id:0 }));
            }
            
            removerServidor(id: number) {
              this.servidores.removeAt(id);
            }
            
            //SETOR      
            criaSetor(setor: any): FormGroup {
              return this.fb.group({
                id: [setor.id],
                nome: [setor.nome, Validators.required],
                dataCriacao: [setor.dataCriacao]
              });
            }
            
            adicionarSetor(){
              this.setores.push(this.criaSetor({ id:0 }));
            }
            
            removerSetor(id: number) {
              this.setores.removeAt(id);
            }
            
            //CATEGORIA      
            criaCategoria(categoria: any): FormGroup {
              return this.fb.group({
                id: [categoria.id],
                nome: [categoria.nome, Validators.required],
                dataCriacao: [categoria.dataCriacao]
              });
            }
            
            adicionarCategoria(){
              this.categorias.push(this.criaCategoria({ id:0 }));
            }
            
            removerCategoria(id: number) {
              this.categorias.removeAt(id);
            }
            
          }
          