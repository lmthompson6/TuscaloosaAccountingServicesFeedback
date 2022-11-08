using API.Models;
using API.Interfaces;
using MySql.Data.MySqlClient;

namespace API.Database
{
    public class GetQuestions : IReadAllQuestions
    {
        public List<Question> GetAllQuestions(int Assign_ID)
        {
            List<Question> questions = new List<Question>();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            using var cmd = new MySqlCommand();
            cmd.Connection = con;
            cmd.CommandText = @"Select * from questions where assess_id in (select assess_id from assignment where assign_id = @id)";
            cmd.Parameters.AddWithValue("@id",Assign_ID);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                Question temp = new Question() {Quest_ID = rdr.GetInt16(0), QuestText = rdr.GetString(1), QuestType = rdr.GetString(2), IsOptional = rdr.GetBoolean(3), Assess_ID = rdr.GetInt16(4)};
                questions.Add(temp);
            }
            return questions;
        }
    }
}