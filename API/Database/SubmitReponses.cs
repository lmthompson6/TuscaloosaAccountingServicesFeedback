using API.Interfaces;
using API.Models;
using MySql.Data;
using MySql.Data.MySqlClient;
namespace API.Database
{
    public class SubmitReponses : IUpdateResponse
    {
        public void updateReponses(Response toUpdate)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            using var cmd = new MySqlCommand();
            cmd.Connection = con;
            cmd.CommandText = @"update responses set AnswerText = @text, AnswerRating = @rating where assign_ID = @assignID and Quest_ID = @questID";
            cmd.Parameters.AddWithValue("@text", toUpdate.AnswerText);
            cmd.Parameters.AddWithValue("@rating", toUpdate.Rating);
            cmd.Parameters.AddWithValue("@assignID", toUpdate.Assign_ID);
            cmd.Parameters.AddWithValue("questID", toUpdate.Quest_ID);
            cmd.Prepare();
            cmd.ExecuteNonQuery();    
            
        }
        public void awaitingStatus(int id){
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            using var cmd = new MySqlCommand();
            cmd.Connection = con;
            cmd.CommandText = @"update assignment set isComplete =1, IsManagerApproved =0, assignStatus = 'Awaiting Manager Approval ...' where assign_ID = @id";
            cmd.Parameters.AddWithValue("@id", id);
            cmd.Prepare();
            cmd.ExecuteNonQuery(); 
        }
    }
}