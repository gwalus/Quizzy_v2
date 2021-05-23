using System.Collections.Generic;
using System.Threading.Tasks;
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
        public async Task<IList<string>> GetCategories()
        {
            return await _questionService.GetCategories();
        }
    }
}