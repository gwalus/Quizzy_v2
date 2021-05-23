using System.Collections.Generic;

namespace API.Entities
{
    public class CustomQuestion
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string CorrectAnswer { get; set; }
        public string CategoryName { get; set; }
        public virtual CustomCategory Category { get; set; }
        public virtual ICollection<CustomIncorrectAnswer> IncorrectAnswers { get; set; }
    }
}