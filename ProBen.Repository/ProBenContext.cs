using Microsoft.EntityFrameworkCore;
using ProBen.Domain;

namespace ProBen.Repository
{
    public class ProBenContext : DbContext
    {
        public ProBenContext(DbContextOptions<ProBenContext> options) : base (options){}
        public  DbSet<Beneficio> Beneficios { get; set; }
        public  DbSet<Servidor> Servidores { get; set; }
        public  DbSet<Setor> Setores { get; set; }
        public  DbSet<Categoria> Categorias { get; set; }
        public  DbSet<Orgao> Orgaos { get; set; }
    }
}