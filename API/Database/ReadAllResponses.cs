using API.Interfaces;
using API.Models;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace API.Database
{
    public class ReadAllResponses : IReadResponse
    {
        public List<Response> GetResponse()
        {
            List<Response> allResponses = new List<Response>();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = @"SELECT Response_ID, IFNULL(AnswerText, 'Please enter text'), IFNULL(AnswerRating, 0), Assign_ID, Quest_ID FROM responses";
            using var cmd = new MySqlCommand(stm, con);
            using MySqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                Response temp = new Response() {Response_ID = rdr.GetInt32(0), AnswerText = rdr.GetString(1), Rating = rdr.GetDouble(2), Assign_ID = rdr.GetInt32(3), Quest_ID = rdr.GetInt32(4)};
                allResponses.Add(temp);
            }
            con.Close();

            return allResponses;
        }
        }

}
