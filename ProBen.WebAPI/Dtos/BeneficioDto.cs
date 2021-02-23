using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProBen.WebAPI.Dtos
{
    public class BeneficioDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string DataCriacao { get; set; }
        public List<CategoriaDto> Categorias { get; set; }
        public List<SetorDto> Setores { get; set; }
        public List<ServidorDto> Servidores { get; set; }
        public string ImagemUrl { get; set; }
    }
}