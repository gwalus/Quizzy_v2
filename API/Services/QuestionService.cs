using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Entities;
using API.Interfaces;

namespace API.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly QuizContext _context;
        public QuestionService(QuizContext context)
        {
            _context = context;
        }

        public async Task<bool> AddCategory(QuestionToAdd questionModel)
        {

        }

        public async Task<bool> AddCategory(string category)
        {
            await _context.CustomCategories.AddAsync(new CustomCategory { Name = category });
            return (await _context.SaveChangesAsync() > 0);
        }
    }
}