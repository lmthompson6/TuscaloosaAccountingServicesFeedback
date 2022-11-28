using API.Models;
using MySql.Data.MySqlClient;
namespace API.Database
{
    public class GetSpecificAssignment
    {
        public Assignment GetAssignment(int id){
            Assignment specificAssign = new Assignment();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            using var cmd = new MySqlCommand();
            cmd.Connection = con;
            cmd.CommandText = @"SELECT * from Assignment where Assign_ID = @id";
            cmd.Parameters.AddWithValue("@id",id);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                Assignment temp = new Assignment() {Assign_ID = rdr.GetInt16(0), IsComplete = rdr.GetBoolean(1), IsManagerApproved = rdr.GetBoolean(2), AssignStatus = rdr.GetString(3), DueDate = rdr.GetString(4), StatusDate = rdr.GetString(5), AssignTitle = rdr.GetString(6), AssignedBy = rdr.GetString(7), Assess_ID = rdr.GetInt32(8), IsReviewing = rdr.GetString(9)};
                specificAssign = temp;
            }
            return specificAssign;
        }

        public string GetEmailAddress(int id){
            System.Console.WriteLine("Made it to get email address");
            string newEmailAddress = "";
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            using var cmd = new MySqlCommand();
            cmd.Connection = con;
            cmd.CommandText = @"SELECT e.EmailAddress from employee e join assignment a on (e.Emp_ID = a.AssignedToEmp_ID) where a.Assign_ID = @id";
            cmd.Parameters.AddWithValue("@id",id);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                newEmailAddress = rdr.GetString(0);
            }
            return newEmailAddress;
        }
    }
}