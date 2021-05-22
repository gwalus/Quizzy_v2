using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly QuizContext _context;
        public QuestionService(QuizContext context)
        {
            _context = context;
        }

        public async Task<bool> AddQuestion(QuestionToAdd questionModel)
        {
            return true;
        }

        public async Task<bool> AddCategory(string category)
        {
            await _context.CustomCategories.AddAsync(new CustomCategory { Name = category });
            return (await _context.SaveChangesAsync() > 0);
        }

        public async Task<bool> CategoryExists(string category)
        {
            return await _context.CustomCategories.AnyAsync(c => c.Name == category);
        }
    }
}