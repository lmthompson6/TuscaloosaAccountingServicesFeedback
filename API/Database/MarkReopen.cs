using MySql.Data.MySqlClient;
namespace API.Database
{
    public class MarkReopen
    {
        public void reopenAssignment(int assignmentNum){
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            using var cmd = new MySqlCommand();
            cmd.Connection = con;
            cmd.CommandText = @"update assignment set isComplete =0, IsManagerApproved =0, assignStatus = 'In Progress ...' where assign_ID = @id";
            cmd.Parameters.AddWithValue("@id", assignmentNum);
            cmd.Prepare();
            cmd.ExecuteNonQuery();            
        }        
        
    }
}