using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProBen.Domain;

namespace ProBen.Repository
{
    public class ProBenRepository : IProBenRepository
    {
        private readonly ProBenContext _context;

        public ProBenRepository(ProBenContext context)
        {
            _context = context;
            _context .ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        //GERAL
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }   
        public void DeleteRange<T>(T[] entityArray) where T : class
        {
            _context.RemoveRange(entityArray);
        }     
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
        //BENEFICIO
        public async Task<Beneficio[]> GetAllBeneficioAsync(bool includeServidores = false)
        {
            IQueryable<Beneficio> query = _context.Beneficios
                .Include(c => c.Categorias)
                .Include(c => c.Setores);

            if(includeServidores)
            {
                query = query 
                    .Include(s => s.Servidores);
            }

            query = query.AsNoTracking()
                        .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Beneficio> GetAllBeneficioAsyncById(int BeneficioId, bool includeServidores)
        {
            IQueryable<Beneficio> query = _context.Beneficios
                .Include(c => c.Categorias)
                .Include(c => c.Setores);

            if(includeServidores)
            {
                query = query 
                    .Include(s => s.Servidores);
            }

            query = query.AsNoTracking()
                        .OrderByDescending(c => c.DataCriacao)
                        .Where(c => c.Id == BeneficioId);

            return await query.FirstOrDefaultAsync(); 
        }

        public async Task<Beneficio[]> GetAllBeneficioAsyncByNome(string nome, bool includeServidores)
        {
            IQueryable<Beneficio> query = _context.Beneficios
                .Include(c => c.Categorias)
                .Include(c => c.Setores);

            if(includeServidores)
            {
                query = query 
                    .Include(b => b.Servidores);
            }

            query = query.AsNoTracking()
                        .OrderByDescending(c => c.DataCriacao)
                        .Where(c => c.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync(); 
        }
        //SERVIDOR
        public async Task<Servidor[]> GetAllServidorAsync(bool includeBeneficios = false)
        {
            IQueryable<Servidor> query = _context.Servidores;

            query = query.AsNoTracking()
                        .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }
        public async Task<Servidor> GetAllServidorAsyncById(int ServidorId, bool includeBeneficios = false)
        {
            IQueryable<Servidor> query = _context.Servidores;

            query = query.AsNoTracking()
                    .OrderBy(c => c.Nome)
                    .Where(s => s.Id == ServidorId);

            return await query.FirstOrDefaultAsync(); 
        }

        public async Task<Servidor[]> GetAllServidorAsyncByNome(string nome, bool includeBeneficios = false)
        {
            IQueryable<Servidor> query = _context.Servidores
                .Include(c => c.Orgaos);

            if(includeBeneficios)
            {
                query = query 
                    .Include(s => s.Beneficio);
            }

            query = query.AsNoTracking()
                    .OrderBy(c => c.Nome)
                    .Where(s => s.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync(); 
        }

        //SETOR
        public async Task<Setor[]> GetAllSetorAsync()
        {
            IQueryable<Setor> query = _context.Setores;

            query = query.AsNoTracking()
                        .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }
        public async Task<Setor> GetAllSetorAsyncById(int SetorId)
        {
            IQueryable<Setor> query = _context.Setores;

            query = query.AsNoTracking()
                    .OrderBy(c => c.Nome)
                    .Where(s => s.Id == SetorId);

            return await query.FirstOrDefaultAsync(); 
        }

        public async Task<Setor[]> GetAllSetorAsyncByNome(string nome)
        {
            IQueryable<Setor> query = _context.Setores;

            query = query.AsNoTracking()
                    .OrderBy(c => c.Nome)
                    .Where(s => s.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync(); 
        }

        //ORGAO
        public async Task<Orgao[]> GetAllOrgaoAsync()
        {
            IQueryable<Orgao> query = _context.Orgaos;

            query = query.AsNoTracking()
                        .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }
        public async Task<Orgao> GetAllOrgaoAsyncById(int OrgaoId)
        {
            IQueryable<Orgao> query = _context.Orgaos;

            query = query.AsNoTracking()
                    .OrderBy(c => c.Nome)
                    .Where(s => s.Id == OrgaoId);

            return await query.FirstOrDefaultAsync(); 
        }

        public async Task<Orgao[]> GetAllOrgaoAsyncByNome(string nome)
        {
            IQueryable<Orgao> query = _context.Orgaos;

            query = query.AsNoTracking()
                    .OrderBy(c => c.Nome)
                    .Where(s => s.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync(); 
        }

        //SETOR
        public async Task<Categoria[]> GetAllCategoriaAsync()
        {
            IQueryable<Categoria> query = _context.Categorias;

            query = query.AsNoTracking()
                        .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }
        public async Task<Categoria> GetAllCategoriaAsyncById(int CategoriaId)
        {
            IQueryable<Categoria> query = _context.Categorias;

            query = query.AsNoTracking()
                    .OrderBy(c => c.Nome)
                    .Where(s => s.Id == CategoriaId);

            return await query.FirstOrDefaultAsync(); 
        }

        public async Task<Categoria[]> GetAllCategoriaAsyncByNome(string nome)
        {
            IQueryable<Categoria> query = _context.Categorias;

            query = query.AsNoTracking()
                    .OrderBy(c => c.Nome)
                    .Where(s => s.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync(); 
        }
    }
}