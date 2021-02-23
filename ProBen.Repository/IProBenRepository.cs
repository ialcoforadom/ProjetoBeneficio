using System.Threading.Tasks;
using ProBen.Domain;

namespace ProBen.Repository
{
    public interface IProBenRepository
    {
        //GERAL
         void Add<T>(T entity) where T : class;
         void Update<T>(T entity) where T : class;
         void Delete<T>(T entity) where T : class;
         void DeleteRange<T>(T[] entity) where T : class;
         Task<bool> SaveChangesAsync();

         //BENEFICIOS
         Task<Beneficio[]> GetAllBeneficioAsyncByNome(string nome, bool includeServidores);
         Task<Beneficio[]> GetAllBeneficioAsync(bool includeServidores);
         Task<Beneficio> GetAllBeneficioAsyncById(int BeneficioId, bool includeServidores);

         //SERVIDORES
         Task<Servidor[]> GetAllServidorAsync(bool includeBeneficios);
         Task<Servidor[]> GetAllServidorAsyncByNome(string nome, bool includeBeneficios);
         Task<Servidor> GetAllServidorAsyncById(int ServidorId, bool includeBeneficios);

         //SETORES
         Task<Setor[]> GetAllSetorAsync();
         Task<Setor[]> GetAllSetorAsyncByNome(string nome);
         Task<Setor> GetAllSetorAsyncById(int SetorId);

         //ORGAOS
         Task<Orgao[]> GetAllOrgaoAsync();
         Task<Orgao[]> GetAllOrgaoAsyncByNome(string nome);
         Task<Orgao> GetAllOrgaoAsyncById(int OrgaoId);

         //CATEGORIAS
         Task<Categoria[]> GetAllCategoriaAsync();
         Task<Categoria[]> GetAllCategoriaAsyncByNome(string nome);
         Task<Categoria> GetAllCategoriaAsyncById(int CategoriaId);
    }
}