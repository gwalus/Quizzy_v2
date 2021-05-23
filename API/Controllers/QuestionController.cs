using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class QuestionController : BaseApiController
    {
        private readonly IQuestionService _questionService;
        public QuestionController(IQuestionService questionService)
        {
            _questionService = questionService;
        }

        [HttpGet("categories")]
        public async Task<IList<CustomCategoryDto>> GetCategories()
        {
            return await _questionService.GetCategories();
        }

        [HttpGet("question")]
        public async Task<ActionResult> GetQuestion(int categoryId)
        {
            var question = await _questionService.GetQuestionForCategory(categoryId);

            if (question == null)
                return NotFound();

            return Ok(question);
        }
    }
}