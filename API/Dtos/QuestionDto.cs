namespace API.Dtos
{
    public class QuestionDto
    {
        public int QuestionId { get; set; }
        public string Question { get; set; }
        public string[] Answers { get; set; }
    }
}