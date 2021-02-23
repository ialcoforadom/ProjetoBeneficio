using AutoMapper;
using ProBen.Domain;
using ProBen.WebAPI.Dtos;

namespace ProBen.WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Beneficio, BeneficioDto>().ReverseMap();
            CreateMap<Servidor, ServidorDto>().ReverseMap();
            CreateMap<Setor, SetorDto>().ReverseMap();
            CreateMap<Categoria, CategoriaDto>().ReverseMap();
            CreateMap<Orgao, OrgaoDto>().ReverseMap();
        }
    }
}