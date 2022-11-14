using API.Models;
using API.Interfaces;
namespace API.Database
{
    public class CreateSelfReview : ICreateAssignment
    {
        public void createAssignment(Assignment newAssign)
        {
            System.Console.WriteLine("I made it!!!!");
        }
    }
}