namespace API.Models
{
    public class QuestionParams
    {
        public string CategoryId { get; set; }
        public string Difficulty { get; set; } = "easy";
        public string Amount { get; set; } = "10";
        public string Type { get; set; } = "multiple";
    }
}
