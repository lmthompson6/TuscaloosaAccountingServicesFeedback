using API.Interfaces;
using API.Models;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace API.Database
{
    public class ReadAllEmployees : IReadAllEmployees
    {
        public List<Employee> GetAllEmployees()
        {
            List<Employee> allEmployees = new List<Employee>();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = @"SELECT * FROM employee";
            using var cmd = new MySqlCommand(stm, con);
            using MySqlDataReader rdr = cmd.ExecuteReader();
            while(rdr.Read()){
                Employee temp = new Employee(){Emp_ID=rdr.GetInt16(0),EmailAddress=rdr.GetString(1),IsManager=rdr.GetByte(2),IsActive=rdr.GetByte(3),FirstName=rdr.GetString(4),LastName=rdr.GetString(5),PasswordHash=rdr.GetString(6)};
                allEmployees.Add(temp);
            }
            return allEmployees;
        }
    }
}


    