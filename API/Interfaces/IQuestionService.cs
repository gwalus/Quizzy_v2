using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;

namespace API.Interfaces
{
    public interface IQuestionService
    {
        Task<bool> AddQuestion(QuestionToAdd questionModel);
        Task<bool> AddCategory(string category);
        Task<bool> CategoryExists(string category);
        Task<IList<CustomCategoryDto>> GetCategories();
        Task<QuestionDto> GetQuestionForCategory(int categoryId);
        Task<bool> CheckAnswer(int questionId, string userAnswer);
    }
}