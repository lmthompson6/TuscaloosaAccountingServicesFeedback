using API.Models;
namespace API.Interfaces
{
    public interface IReadAllAssignments
    {
         public List<Assignment> GetAssignments(int id);
    }
}