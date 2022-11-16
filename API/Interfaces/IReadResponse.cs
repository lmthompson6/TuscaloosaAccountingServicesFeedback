using API.Models;
namespace API.Interfaces
{
    public interface IReadResponse
    {
        Response GetAResponse(int assignID, int questID);
    }
}