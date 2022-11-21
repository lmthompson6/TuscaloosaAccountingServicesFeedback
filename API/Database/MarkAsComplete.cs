using API.Models;
using API.Interfaces;
using MySql.Data.MySqlClient;
namespace API.Database
{
    public class MarkAsComplete
    {
        public void completeAssignment(int assignmentNum){
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            using var cmd = new MySqlCommand();
            cmd.Connection = con;
            cmd.CommandText = @"update assignment set isComplete =1, IsManagerApproved =1, assignStatus = 'Completed ☑', statusDate = @statusDate where assign_ID = @id";
            cmd.Parameters.AddWithValue("@id", assignmentNum);
            cmd.Parameters.AddWithValue("@statusDate", DateTime.Now);
            cmd.Prepare();
            cmd.ExecuteNonQuery();            
        }
    }
}