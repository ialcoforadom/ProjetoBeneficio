using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProBen.Domain;
using ProBen.Repository;
using ProBen.WebAPI.Dtos;

namespace ProBen.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeneficioController : ControllerBase
    {
        private readonly IProBenRepository _repo;
        private readonly IMapper _mapper;

        public BeneficioController(IProBenRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var beneficios = await _repo.GetAllBeneficioAsync(true);

                var results = _mapper.Map<BeneficioDto[]>(beneficios);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou {ex.Message}");
            } 
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Pdfs");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var filename = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName;
                    var fullPath = Path.Combine(pathToSave, filename.Replace("\"", " ").Trim());

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                }

                return Ok();
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
        }

        [HttpGet("{BeneficioId}")]
        public async Task<IActionResult> Get(int BeneficioId)
        {
            try
            {
                var beneficio = await _repo.GetAllBeneficioAsyncById(BeneficioId, true);

                var results = _mapper.Map<BeneficioDto>(beneficio);

                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            } 
        }

        [HttpGet("getByNome/{nome}")]
        public async Task<IActionResult> Get(string nome)
        {
            try
            {
                var beneficios = await _repo.GetAllBeneficioAsyncByNome(nome, true);

                var results = _mapper.Map<BeneficioDto[]>(beneficios);

                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            } 
        }
        [HttpPost]
        public async Task<IActionResult> Post(BeneficioDto model)
        {
            try
            {

                var beneficio = _mapper.Map<Beneficio>(model);

                _repo.Add(beneficio);

                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/benefico/{model.Id}", _mapper.Map<BeneficioDto>(beneficio));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de Dados Falhou {ex.Message}");
            } 

            return BadRequest();
        }
        [HttpPut("{BeneficioId}")]
        public async Task<IActionResult> Put(int BeneficioId, BeneficioDto model)
        {
            try
            {
                var beneficio = await _repo.GetAllBeneficioAsyncById(BeneficioId, false);
                if (beneficio == null) return NotFound();

                

                _mapper.Map(model, beneficio);

                _repo.Update(beneficio);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/beneficio/{model.Id}", _mapper.Map<BeneficioDto>(beneficio));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou " + ex.Message);
            }

            return BadRequest();
        }

        [HttpDelete("{BeneficioId}")]
        public async Task<IActionResult> Delete(int BeneficioId)
        {
            try
            {
                var beneficio = await _repo.GetAllBeneficioAsyncById(BeneficioId, false);
                if(beneficio == null) return NotFound();

                _repo.Delete(beneficio);

                if(await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            } 
            
            return BadRequest();
        }
        
    }
}