using System.Threading.Tasks;
using API.Dtos;

namespace API.Interfaces
{
    public interface IQuestionService
    {
        Task<bool> AddQuestion(QuestionToAdd questionModel);
        Task<bool> AddCategory(string category);
        Task<bool> CategoryExists(string category);
    }
}