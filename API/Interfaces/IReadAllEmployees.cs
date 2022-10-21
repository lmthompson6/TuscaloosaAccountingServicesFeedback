using API.Models;
namespace API.Interfaces
{
    public interface IReadAllEmployees
    {
         public List<Employee> GetAllEmployees();
    }
}