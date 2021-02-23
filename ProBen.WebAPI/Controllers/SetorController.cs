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
    public class SetorController : ControllerBase
    {
        private readonly IProBenRepository _repo;
        private readonly IMapper _mapper;

        public SetorController(IProBenRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var setores = await _repo.GetAllSetorAsync();

                var results = _mapper.Map<SetorDto[]>(setores);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou {ex.Message}");
            } 
        }

        [HttpPost]
        public async Task<IActionResult> Post(SetorDto model)
        {
            try
            {

                var setor = _mapper.Map<Setor>(model);

                _repo.Add(setor);

                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/setor/{model.Id}", _mapper.Map<SetorDto>(setor));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de Dados Falhou {ex.Message}");
            } 

            return BadRequest();
        }
        [HttpPut("{SetorId}")]
        public async Task<IActionResult> Put(int SetorId, SetorDto model)
        {
            try
            {
                var setor = await _repo.GetAllSetorAsyncById(SetorId);
                if(setor == null) return NotFound();

                _mapper.Map(model, setor);

                _repo.Update(setor);

                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/setor/{model.Id}", _mapper.Map<SetorDto>(setor));
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            } 
            
            return BadRequest();
        }
        [HttpDelete("{SetorId}")]
        public async Task<IActionResult> Delete(int SetorId)
        {
            try
            {
                var setor = await _repo.GetAllSetorAsyncById(SetorId);
                if(setor == null) return NotFound();

                _repo.Delete(setor);

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