using System;
using System.Collections.Generic;
using System.Linq;
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
            var category = await _context.CustomCategories.FirstOrDefaultAsync(c => c.Name == questionModel.Name);

            var question = new CustomQuestion
            {
                Category = category,
                CategoryName = questionModel.Name,
                Question = questionModel.Question,
                CorrectAnswer = questionModel.CorrectAnswer,
                IncorrectAnswers = new List<CustomIncorrectAnswer>()
            };

            foreach (var incorrectAnswer in questionModel.IncorrectAnswers)
            {
                question.IncorrectAnswers.Add(new CustomIncorrectAnswer { IncorrectAnswer = incorrectAnswer });
            }

            await _context.CustomQuestions.AddAsync(question);
            return (await _context.SaveChangesAsync() > 0);
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

        public async Task<IList<CustomCategoryDto>> GetCategories()
        {
            return await _context.CustomCategories.Select(x => new CustomCategoryDto { Id = x.Id, Name = x.Name }).ToListAsync();
        }

        public async Task<QuestionDto> GetQuestionForCategory(int categoryId)
        {
            var question = await _context.CustomQuestions
                .FromSqlRaw("SELECT * FROM \"CustomQuestions\" ORDER BY RANDOM()")
                .Where(x => x.Category.Id == categoryId)
                .Include(x => x.IncorrectAnswers)
                .Select(x => new QuestionDto
                {
                    QuestionId = x.Id,
                    Question = x.Question,
                    Answers = x.IncorrectAnswers.Select(y => y.IncorrectAnswer).ToList()
                })
                .FirstOrDefaultAsync();

            if(question != null)
            {
                var correctAnswer = await _context.CustomQuestions.Where(x => x.Id == question.QuestionId).Select(x => x.CorrectAnswer).FirstOrDefaultAsync();

                question.Answers.Add(correctAnswer);

                question.Answers.OrderBy(_ => Guid.NewGuid());
            }
            
            return question;
        }
    }
}