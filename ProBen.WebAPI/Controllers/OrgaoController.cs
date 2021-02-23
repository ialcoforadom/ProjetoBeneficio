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
    public class OrgaoController : ControllerBase
    {
        private readonly IProBenRepository _repo;
        private readonly IMapper _mapper;

        public OrgaoController(IProBenRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var orgaos = await _repo.GetAllOrgaoAsync();

                var results = _mapper.Map<OrgaoDto[]>(orgaos);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou {ex.Message}");
            } 
        }

        [HttpPost]
        public async Task<IActionResult> Post(OrgaoDto model)
        {
            try
            {

                var orgao = _mapper.Map<Orgao>(model);

                _repo.Add(orgao);

                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/orgao/{model.Id}", _mapper.Map<OrgaoDto>(orgao));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Banco de Dados Falhou {ex.Message}");
            } 

            return BadRequest();
        }
        [HttpPut("{OrgaoId}")]
        public async Task<IActionResult> Put(int OrgaoId, OrgaoDto model)
        {
            try
            {
                var orgao = await _repo.GetAllOrgaoAsyncById(OrgaoId);
                if(orgao == null) return NotFound();

                _mapper.Map(model, orgao);

                _repo.Update(orgao);

                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/orgao/{model.Id}", _mapper.Map<OrgaoDto>(orgao));
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            } 
            
            return BadRequest();
        }
        [HttpDelete("{OrgaoId}")]
        public async Task<IActionResult> Delete(int OrgaoId)
        {
            try
            {
                var orgao = await _repo.GetAllOrgaoAsyncById(OrgaoId);
                if(orgao == null) return NotFound();

                _repo.Delete(orgao);

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