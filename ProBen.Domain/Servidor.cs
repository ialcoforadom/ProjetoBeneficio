using System;
using System.Collections.Generic;

namespace ProBen.Domain
{
    public class Servidor
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cpf { get; set; }
        public int Matricula { get; set; }
        public DateTime DataCriacao { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public int BeneficioId { get; set; }
        public Beneficio Beneficio { get; }
        public List<Orgao> Orgaos { get; set; }
    }
}