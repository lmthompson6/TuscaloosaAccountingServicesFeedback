using API.Models;
namespace API.Interfaces
{
    public interface IReadAllQuestions
    {
         public List<Question> GetAllQuestions(int Assign_ID);
    }
}