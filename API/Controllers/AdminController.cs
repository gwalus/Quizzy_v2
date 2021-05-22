using System.Threading.Tasks;
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

        [HttpGet("category")]
        public async Task<ActionResult> AddCategory(string categoryName)
        {
            


        }
    }
}