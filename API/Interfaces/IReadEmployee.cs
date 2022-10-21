using API.Models;

namespace API.Interfaces
{
    public interface IReadEmployee
    {
        Employee GetEmployee(int id);
    }
}