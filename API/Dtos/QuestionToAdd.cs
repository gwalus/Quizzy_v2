using System.Collections.Generic;

namespace API.Dtos
{
    public class QuestionToAdd
    {
        public string Name { get; set; }
        public string Question { get; set; }
        public string CorrectAnswer { get; set; }
        public ICollection<string> IncorrectAnswers { get; set; }
    }
}