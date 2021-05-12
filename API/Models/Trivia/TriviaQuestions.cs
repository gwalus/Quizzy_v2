using System.Collections.Generic;

namespace API.Models.Trivia
{
    public class TriviaQuestions
    {
        public int Response_code { get; set; }
        public IList<TriviaQuestion> Results { get; set; }
    }

    public class TriviaQuestion
    {
        public string Category { get; set; }
        public string Type { get; set; }
        public string Difficulty { get; set; }
        public string Question { get; set; }
        public string Correct_answer { get; set; }
        public IList<string> Incorrect_answers { get; set; }
    }
}
