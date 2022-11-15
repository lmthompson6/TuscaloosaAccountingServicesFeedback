using API.Models;
using API.Interfaces;
using MySql.Data.MySqlClient;
namespace API.Database
{
    public class CreateManagerReview : ICreateAssignment
    {
        public void createAssignment(Assignment newAssign)
        {
            DateTime dueDate = new DateTime();
            dueDate = DateTime.Now;
            dueDate = dueDate.AddDays(14);
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            using var cmd = new MySqlCommand();
            cmd.Connection = con;
            cmd.CommandText = @"INSERT INTO assignment values (null, 0, 0, 'Not Started :(', @duedate, @statusdate, 'Employee Survey', @assignedby, @assignedto, 3)";
            cmd.Parameters.AddWithValue("@duedate", dueDate);
            cmd.Parameters.AddWithValue("@statusdate", DateTime.Now);
            cmd.Parameters.AddWithValue("@assignedby", newAssign.AssignedBy);
            cmd.Parameters.AddWithValue("@assignedto", newAssign.AssignedTo);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            int newestAssign = getMaxAssignment();
            int questionNum = 14;
            for(int i = 0;i < 8; i++){
                using var command = new MySqlCommand();
                command.Connection = con;
                command.CommandText = @"INSERT INTO Responses values (null, null, null, @id, @questNum)";
                command.Parameters.AddWithValue("@id", newestAssign);   
                command.Parameters.AddWithValue("@questNum", questionNum);
                command.Prepare();
                command.ExecuteNonQuery();
                questionNum++;             
            }
        }

        public int getMaxAssignment(){
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            using var cmd = new MySqlCommand();
            cmd.Connection = con;
            cmd.CommandText = @"SELECT max(assign_ID) from assignment";
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();
            int assignNumber = 0;
            while (rdr.Read())
            {
                assignNumber = rdr.GetInt32(0);
            }
            return assignNumber;
        }
    }
}