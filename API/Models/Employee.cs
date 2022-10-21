namespace API.Models
{
    public class Employee
    {
       public int Emp_ID {get; set;}
       public string EmailAddress {get;set;}
       public bool IsManager {get; set;}
       public bool IsActive {get; set;}
       public string FirstName {get; set;}
       public string LastName {get; set;}
       public string PasswordHash {get; set;}
       // add something to handle the manager/employee relationship
    }
}