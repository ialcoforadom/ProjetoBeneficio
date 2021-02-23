using System;

namespace ProBen.Domain
{
    public class Orgao
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime DataCriacao { get; set; }
        public int ServidorId { get; set; }
        public Servidor Servidor { get; }
    }
}