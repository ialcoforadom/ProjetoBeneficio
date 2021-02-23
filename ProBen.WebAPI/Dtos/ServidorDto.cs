using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProBen.WebAPI.Dtos
{
    public class ServidorDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cpf { get; set; }
        public int Matricula { get; set; }
        public string DataCriacao { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public int BeneficioId { get; set; }
        public List<OrgaoDto> Orgaos { get; set; }
    }
}