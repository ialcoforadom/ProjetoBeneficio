using System;
using System.Collections.Generic;

namespace ProBen.Domain
{
    public class Beneficio
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime DataCriacao { get; set; }
        public List<Categoria> Categorias { get; set; }
        public List<Setor> Setores { get; set; }
        public List<Servidor> Servidores { get; set; }
        public string ImagemUrl { get; set; }
    }
}