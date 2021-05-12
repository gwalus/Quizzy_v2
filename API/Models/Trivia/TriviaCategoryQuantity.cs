namespace API.Models.Trivia
{
    public class TriviaCategoryQuantity
    {
        public int Category_id { get; set; }
        public CategoryQuestionCount Category_question_count { get; set; }
    }

    public class CategoryQuestionCount
    {
        public int Total_question_count { get; set; }
        public int Total_easy_question_count { get; set; }
        public int Total_medium_question_count { get; set; }
        public int Total_hard_question_count { get; set; }
    }
}
