namespace API.Models
{
    public class Question
    {
        public int Quest_ID {get; set;}
        public string QuestText {get; set;}
        public string QuestType {get; set;}
        public bool IsOptional {get; set;}
        public int Assess_ID {get; set;}
        
    }
}