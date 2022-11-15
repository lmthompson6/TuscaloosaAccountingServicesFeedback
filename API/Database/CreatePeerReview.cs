using API.Models;
using API.Interfaces;
using MySql.Data.MySqlClient;
namespace API.Database
{
    public class CreatePeerReview : ICreateAssignment
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
            cmd.CommandText = @"INSERT INTO assignment values (null, 0, 0, 'Not Started :(', @duedate, @statusdate, 'Peer Review', @assignedby, @assignedto, 2)";
            cmd.Parameters.AddWithValue("@duedate", dueDate);
            cmd.Parameters.AddWithValue("@statusdate", DateTime.Now);
            cmd.Parameters.AddWithValue("@assignedby", newAssign.AssignedBy);
            cmd.Parameters.AddWithValue("@assignedto", newAssign.AssignedTo);
            cmd.Prepare();
            cmd.ExecuteNonQuery();

        }
    }
}