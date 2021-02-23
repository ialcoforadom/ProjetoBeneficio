using System.ComponentModel.DataAnnotations;

namespace ProBen.WebAPI.Dtos
{
    public class OrgaoDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string DataCriacao { get; set; }
        public int ServidorId { get; set; }
    }
}