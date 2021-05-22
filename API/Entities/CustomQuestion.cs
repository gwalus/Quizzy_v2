using System.Collections.Generic;

namespace API.Entities
{
    public class CustomQuestion
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string CorrectAnswer { get; set; }
        public string CategoryName { get; set; }
        public CustomCategory CategoryId { get; set; }
        public ICollection<CustomIncorrectAnswer> IncorrectAnswers { get; set; }
    }
}