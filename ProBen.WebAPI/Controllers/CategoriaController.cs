using System.Collections.Generic;
using System.IO;
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
    public class CategoriaController : ControllerBase
    {
        private readonly IProBenRepository _repo;
        private readonly IMapper _mapper;

        public CategoriaController(IProBenRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var categorias = await _repo.GetAllCategoriaAsync();

                var results = _mapper.Map<CategoriaDto[]>(categorias);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou {ex.Message}");
            } 
        }

        [HttpPost]
        public async Task<IActionResult> Post(CategoriaDto model)
        {
            try
            {

                var categoria = _mapper.Map<Categoria>(model);

                _repo.Add(categoria);

                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/categoria/{model.Id}", _mapper.Map<CategoriaDto>(categoria));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de Dados Falhou {ex.Message}");
            } 

            return BadRequest();
        }
        [HttpPut("{CategoriaId}")]
        public async Task<IActionResult> Put(int CategoriaId, CategoriaDto model)
        {
            try
            {
                var categoria = await _repo.GetAllCategoriaAsyncById(CategoriaId);
                if(categoria == null) return NotFound();

                _mapper.Map(model, categoria);

                _repo.Update(categoria);

                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/categoria/{model.Id}", _mapper.Map<CategoriaDto>(categoria));
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            } 
            
            return BadRequest();
        }
        [HttpDelete("{CategoriaId}")]
        public async Task<IActionResult> Delete(int CategoriaId)
        {
            try
            {
                var categoria = await _repo.GetAllCategoriaAsyncById(CategoriaId);
                if(categoria == null) return NotFound();

                _repo.Delete(categoria);

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