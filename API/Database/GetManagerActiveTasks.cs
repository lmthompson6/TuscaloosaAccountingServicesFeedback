using API.Interfaces;
using API.Models;
using MySql.Data.MySqlClient;
namespace API.Database
{
    public class GetManagerActiveTasks : IReadAllAssignments
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
            cmd.CommandText = @"SELECT a.Assign_ID, a.IsComplete, a.IsManagerApproved, a.AssignStatus, DATE_FORMAT(a.DueDate, '%m-%d-%Y %r') AS DueDate, DATE_FORMAT(a.StatusDate, '%m-%d-%Y %r') AS StatusDate, a.AssignTitle, concat(e.FirstName, ' ',e.LastName) as name, concat(ep.FirstName, ' ', ep.LastName) as toname, a.Assess_ID, a.IsReviewing FROM 
            assignment a join employee e on (a.AssignedByEmp_ID = e.Emp_ID) join employee ep on (a.AssignedToEmp_ID = ep.Emp_ID) WHERE AssignedByEmp_ID = @id and IsManagerApproved = 0 and AssignStatus = 'Awaiting Manager Approval ...'";
            cmd.Parameters.AddWithValue("@id",id);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                Assignment temp = new Assignment() {Assign_ID = rdr.GetInt16(0), IsComplete = rdr.GetBoolean(1), IsManagerApproved = rdr.GetBoolean(2), AssignStatus = rdr.GetString(3), DueDate = rdr.GetString(4), StatusDate = rdr.GetString(5), AssignTitle = rdr.GetString(6), AssignedBy = rdr.GetString(7), AssignedTo = rdr.GetString(8), Assess_ID = rdr.GetInt32(9), IsReviewing = rdr.GetString(10)};
                activeAssignments.Add(temp);
            }
            return activeAssignments;
        }
    }
}