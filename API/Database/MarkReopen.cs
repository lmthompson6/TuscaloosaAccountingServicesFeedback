using MySql.Data.MySqlClient;
namespace API.Database
{
    public class MarkReopen
    {
        public void reopenAssignment(int assignmentNum){
            DateTime dueDate = new DateTime();
            dueDate = DateTime.Now;
            dueDate = dueDate.AddDays(3);
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            using var cmd = new MySqlCommand();
            cmd.Connection = con;
            cmd.CommandText = @"update assignment set isComplete =0, IsManagerApproved =0, assignStatus = 'Reopened !!', dueDate = @dueDate, statusDate = @statusDate where assign_ID = @id";
            cmd.Parameters.AddWithValue("@id", assignmentNum);
            cmd.Parameters.AddWithValue("@statusDate", DateTime.Now);
            cmd.Parameters.AddWithValue("@dueDate", dueDate);
            cmd.Prepare();
            cmd.ExecuteNonQuery();            
        }        
        
    }
}