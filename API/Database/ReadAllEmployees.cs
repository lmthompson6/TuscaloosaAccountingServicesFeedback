using API.Interfaces;
using API.Models;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace API.Database
{
    public class ReadAllEmployees : IReadAllEmployees, IReadEmployee
    {
        public List<Employee> GetAllEmployees()
        {
            List<Employee> allEmployees = new List<Employee>();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = @"SELECT Emp_ID, EmailAddress, isManager, isActive, FirstName, LastName, PasswordHash, IFNULL(managed_by_emp_id, 0) FROM employee";
            using var cmd = new MySqlCommand(stm, con);
            using MySqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                Employee temp = new Employee() { Emp_ID = rdr.GetInt16(0), EmailAddress = rdr.GetString(1), IsManager = rdr.GetBoolean(2), IsActive = rdr.GetBoolean(3), FirstName = rdr.GetString(4), LastName = rdr.GetString(5), PasswordHash = rdr.GetString(6), ManagedBy = rdr.GetInt32(7) };
                allEmployees.Add(temp);
            }
            con.Close();

            return allEmployees;
        }
        public Employee GetEmployee(int id)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            try
            {
                string stm = @"SELECT * FROM employee WHERE emp_ID = @empID";
                using var cmd = new MySqlCommand(stm, con);
                cmd.Parameters.AddWithValue("@empID", id);
                using MySqlDataReader rdr = cmd.ExecuteReader();
                rdr.Read();
                con.Close();
                return new Employee() { Emp_ID = rdr.GetInt16(0), EmailAddress = rdr.GetString(1), IsManager = rdr.GetBoolean(2), IsActive = rdr.GetBoolean(3), FirstName = rdr.GetString(4), LastName = rdr.GetString(5), PasswordHash = rdr.GetString(6) };
            }
            catch (Exception)
            {
                return new Employee();
            }
            finally
            {
                con.Close();
            }
        }
    }
}


