using API.Models;
using API.Interfaces;
using MySql.Data.MySqlClient;
namespace API.Database
{
    public class GetResponse
    {
        public Response GetAResponse(int assignmentID, int questionID)
        {
            Response readResponse = new Response();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            using var cmd = new MySqlCommand();
            cmd.Connection = con;
            cmd.CommandText = @"Select * from responses where Assign_ID = @asID and Quest_ID = @qID";
            cmd.Parameters.AddWithValue("@asID",assignmentID);
            cmd.Parameters.AddWithValue("qID", questionID);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                readResponse = new Response() {Response_ID = rdr.GetInt32(0), AnswerText = rdr.GetString(1), Rating = rdr.GetDouble(2), Assign_ID = rdr.GetInt32(3), Quest_ID = rdr.GetInt32(4)};
            }
            return readResponse;
        }
    }
}