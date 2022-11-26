namespace API.Models
{
    public class Assignment
    {
        public int Assign_ID {get; set;}
        public bool IsComplete {get; set;}
        public bool IsManagerApproved {get; set;}
        public string AssignStatus {get; set;}
        public string DueDate {get; set;}
        public string StatusDate {get; set;}
        public string AssignTitle {get; set;}
        public string AssignedBy {get; set;}
        public string AssignedTo {get; set;}
        public int Assess_ID {get; set;}
        public string IsReviewing {get; set;}
        
    }
}