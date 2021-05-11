using API.Dtos;
using API.Models.Trivia;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    interface ITriviaService
    {
        Task<IList<Result>> GetQuestions(string category, string difficulty, string amount, string type);
        Task<IList<TriviaCategoryDto>> GetCategories();
        Task<CategoryQuestionCount> GetCategoriesQuantity(string categoryId);
    }
}
