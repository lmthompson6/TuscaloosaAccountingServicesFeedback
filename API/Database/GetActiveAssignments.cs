using API.Interfaces;
using API.Models;
using MySql.Data.MySqlClient;

namespace API.Database
{
    public class GetActiveAssignments : IReadAllAssignments
    {
        public List<Assignment> GetAssignments(int id)
        {
            List<Assignment> activeAssignments = new List<Assignment>();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            using var cmd = new MySqlCommand();
            cmd.Connection = con;
            cmd.CommandText = @"SELECT Assign_ID, IsComplete, IsManagerApproved, AssignStatus, DATE_FORMAT(DueDate, '%m-%d-%Y') AS DueDate, DATE_FORMAT(StatusDate, '%m-%d-%Y') AS StatusDate, AssignTitle FROM assignment WHERE AssignedToEmp_ID = @id and IsManagerApproved = 0";
            cmd.Parameters.AddWithValue("@id",id);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                Assignment temp = new Assignment() {Assign_ID = rdr.GetInt16(0), IsComplete = rdr.GetBoolean(1), IsManagerApproved = rdr.GetBoolean(2), AssignStatus = rdr.GetString(3), DueDate = rdr.GetString(4), StatusDate = rdr.GetString(5), AssignTitle = rdr.GetString(6)};
                activeAssignments.Add(temp);
            }
            return activeAssignments;
        }
    }
}