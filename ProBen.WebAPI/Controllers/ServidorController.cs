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
    public class ServidorController : ControllerBase
    {
        private readonly IProBenRepository _repo;
        private readonly IMapper _mapper;

        public ServidorController(IProBenRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var servidores = await _repo.GetAllServidorAsync(true);

                var results = _mapper.Map<ServidorDto[]>(servidores);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou {ex.Message}");
            } 
        }

        [HttpGet("{ServidorId}")]
        public async Task<IActionResult> Get(int ServidorId)
        {
            try
            {
                var servidor = await _repo.GetAllServidorAsyncById(ServidorId, true);

                var results = _mapper.Map<ServidorDto>(servidor);

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
                var servidores = await _repo.GetAllServidorAsyncByNome(nome, true);

                var results = _mapper.Map<ServidorDto[]>(servidores);

                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            } 
        }
        [HttpPost]
        public async Task<IActionResult> Post(ServidorDto model)
        {
            try
            {

                var servidor = _mapper.Map<Servidor>(model);

                _repo.Add(servidor);

                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/servidor/{model.Id}", _mapper.Map<ServidorDto>(servidor));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de Dados Falhou {ex.Message}");
            } 

            return BadRequest();
        }
        [HttpPut("{ServidorId}")]
        public async Task<IActionResult> Put(int ServidorId, ServidorDto model)
        {
            try
            {
                var servidor = await _repo.GetAllServidorAsyncById(ServidorId, false);
                if(servidor == null) return NotFound();

                _mapper.Map(model, servidor);

                _repo.Update(servidor);

                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/servidor/{model.Id}", _mapper.Map<ServidorDto>(servidor));
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            } 
            
            return BadRequest();
        }
        [HttpDelete("{ServidorId}")]
        public async Task<IActionResult> Delete(int ServidorId)
        {
            try
            {
                var servidor = await _repo.GetAllServidorAsyncById(ServidorId, false);
                if(servidor == null) return NotFound();

                _repo.Delete(servidor);

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