using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using API.Dtos;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class QuestionsController : BaseApiController
    {
        private readonly IQuestionService _questionService;
        public QuestionsController(IQuestionService questionService)
        {
            _questionService = questionService;
        }

        [HttpGet("categories")]
        public async Task<IList<CustomCategoryDto>> GetCategories()
        {
            return await _questionService.GetCategories();
        }

        [HttpGet("")]
        public async Task<ActionResult> GetQuestion(int categoryId)
        {
            var question = await _questionService.GetQuestionForCategory(categoryId);

            if (question == null)
                return NotFound();

            return Ok(question);
        }

        [HttpGet("check-answer")]
        public async Task<string> CheckAnswer([FromBody] int questionId, string userAnswer)
        {
            if (await _questionService.CheckAnswer(questionId, userAnswer))
                return JsonSerializer.Serialize("Good answer");

            return JsonSerializer.Serialize("Incorrect");
        }
    }
}