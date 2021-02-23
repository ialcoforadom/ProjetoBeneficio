using System;

namespace ProBen.Domain
{
    public class Setor
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime DataCriacao { get; set; }
        public int BeneficioId { get; set; }
        public Beneficio Beneficio { get; }
    }
}