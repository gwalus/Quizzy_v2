using API.Models.Trivia;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface ITriviaService
    {
        Task<IList<TriviaQuestion>> GetQuestions(string categoryId, string difficulty, string amount, string type);
        Task<IList<Category>> GetCategories();
        Task<CategoryQuestionCount> GetCategoriesQuantity(string categoryId);
    }
}
