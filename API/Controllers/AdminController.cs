using System.Threading.Tasks;
using API.Dtos;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly IQuestionService _questionService;
        public AdminController(IQuestionService questionService)
        {
            _questionService = questionService;
        }

        [HttpPost("category")]
        public async Task<ActionResult> AddCategory(string name)
        {
            if (await _questionService.CategoryExists(name))
                return BadRequest("Category already exists");

            if (await _questionService.AddCategory(name))
                return Ok("Category has been added");

            return BadRequest();
        }

        [HttpPost("question")]
        public async Task<ActionResult> AddQuestion([FromBody] QuestionToAdd question)
        {
            if (await _questionService.AddQuestion(question))
                return Ok("Question has been added");

            return BadRequest();
        }
    }
}