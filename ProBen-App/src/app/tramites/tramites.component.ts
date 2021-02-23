import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';
import { Beneficio } from '../_models/Beneficio';
import { BeneficioService } from '../_service/Beneficio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.scss']
})
export class TramitesComponent implements OnInit {
  titulo = "Tramites";
  
  tramite: Beneficio = new Beneficio();  
  
  tramites!: Beneficio[];
  @ViewChild('myInput') myInput!: ElementRef; 
  private filtro: any;
  modoSalvar = 'post';
  mostrarImagem = false;
  
  imagemLargura = 50;
  imagemMargem = 2;
  
  dataCriacao!: string;
  
  registerForm!: FormGroup;
  bodyDeletarTramite = '';
  
  dataAtual!: string;
  
  _filtroLista!: string;
  
  get setores(): FormArray {
    return <FormArray>this.registerForm.get('setores');
  }
  
  constructor(
    private tramiteService: BeneficioService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localService: BsLocaleService,
    private toastr : ToastrService,
    private router: ActivatedRoute
    ) { 
      this.localService.use('pt-br');
    }
    
    editarTramites(tramite: Beneficio, template: any) {
      this.modoSalvar = 'put';
      this.openModal(template);
      this.tramite = Object.assign({}, tramite);
      this.registerForm.patchValue(this.tramite);
      this.getSetor();
    }
    
    
    
    alternarArquivo() {
      this.mostrarImagem = !this.mostrarImagem;
    }
    
    openModal(template: any){
      this.registerForm.reset();
      template.show();
    }
    
    ngOnInit() {
      this.validation();
      this.getTramites();
    }
    
    validation(){
      this.registerForm = this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(4)]],
        dataCriacao: ['', Validators.required],
        imagemUrl: [''],
        setores: this.fb.array([]),
      });
    }
    
    tramitar(template: any) {
      if (this.registerForm.valid) {
        
        this.tramite = Object.assign({id: this.tramite.id}, this.registerForm.value);
        
        this.tramiteService.putBeneficio(this.tramite).subscribe(
          () => { 
            template.hide();
            this.getTramites();
            this.toastr.success('Tramitado com Sucesso!');
          }, error => {
            this.toastr.error(`Erro ao tramitar: ${error}`);
          }
          );
        }
      }
      
      criaSetor(setor: any): FormGroup {
        return this.fb.group({
          id: [setor.id],
          nome: [setor.nome, Validators.required],
          dataCriacao: [setor.dataCriacao]
        });
      }
      
      getSetor(){
        const idtramite = Number(this.router.snapshot.paramMap.get('id'));
        this.tramiteService.getBeneficioById(idtramite)
        .subscribe(
          (tramite: Beneficio) => {
            this.tramite = Object.assign({}, tramite);
            
            this.registerForm.patchValue(this.tramite);
            
            this.tramite.setores.forEach(setor => {
              this.setores.push(this.criaSetor(setor));
            });
          }
          );
        }
        
        getTramites() {
          this.tramiteService.getAllBeneficio().subscribe(
            (_tramites: Beneficio[]) => {
              this.tramites = _tramites;
              console.log(this.tramites);
            }, error => {
              this.toastr.error(`Erro ao tentar Carregar benefício: ${error}`);
            });
            
            const idTramite = Number(this.router.snapshot.paramMap.get('id'));
            this.tramiteService.getBeneficioById(idTramite)
            .subscribe(
              (tramite: Beneficio) => {
                this.tramite = Object.assign({}, tramite);
                
                this.registerForm.patchValue(this.tramite);
                
                this.tramite.setores.forEach(setor => {
                  this.setores.push(this.criaSetor(setor));
                });
              }
              );
              
            }
          }
          