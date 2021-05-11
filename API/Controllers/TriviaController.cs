using API.Interfaces;
using API.Models.Trivia;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class TriviaController : BaseApiController
    {
        private readonly ITriviaService _triviaService;

        public TriviaController(ITriviaService triviaService)
        {
            _triviaService = triviaService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Result>>> GetQuestions([FromQuery] QuestionParams questionParams)
        {
            return Ok(await _triviaService.GetQuestions(questionParams.CategoryId, questionParams.Difficulty, questionParams.Amount, questionParams.Type));
        }
    }
}
