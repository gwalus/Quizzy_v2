using System.Collections.Generic;

namespace API.Dtos
{
    public class QuestionDto
    {
        public int QuestionId { get; set; }
        public string Category { get; set; }
        public string Question { get; set; }
        public IList<string> Answers { get; set; }
    }
}