using System.Collections.Generic;

namespace API.Models.Trivia
{
    public class TriviaCategory
    {
        public IList<Category> Trivia_categories { get; set; }
    }

    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
