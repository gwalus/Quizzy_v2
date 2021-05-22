using System.Threading.Tasks;
using API.Dtos;

namespace API.Interfaces
{
    public interface IQuestionService
    {
        Task<bool> AddCategory(QuestionToAdd questionModel);
        Task<bool> AddCategory(string category);
    }
}