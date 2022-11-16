using API.Models;
using API.Interfaces;
using MySql.Data.MySqlClient;
namespace API.Database
{
    public class GetResponse : IReadResponse
    {
        public Response GetAResponse(int assignmentID, int questionID)
        {
            Response readResponse = new Response();
            return readResponse;
        }
    }
}