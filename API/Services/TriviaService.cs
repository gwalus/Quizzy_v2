using API.Dtos;
using API.Interfaces;
using API.Models.Trivia;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Services
{
    public class TriviaService : ITriviaService
    {
        private readonly RestClient _client = new RestClient("https://opentdb.com/api.php?");

        public async Task<IList<TriviaCategoryDto>> GetCategories()
        {
            throw new NotImplementedException();
        }

        public async Task<CategoryQuestionCount> GetCategoriesQuantity(string categoryId)
        {
            var request = new RestRequest("https://opentdb.com/api_count.php?category")
                .AddParameter("category", $"{categoryId}");

            var response = await _client.ExecuteAsync<TriviaCategoryQuantity>(request);

            if (response.IsSuccessful)
                return response.Data.Category_question_count;

            return null;
        }

        public async Task<IList<Result>> GetQuestions(string categoryId, string difficulty, string amount, string type)
        {
            var request = new RestRequest()
                .AddParameter("category", $"{categoryId}")
                .AddParameter("difficulty", $"{difficulty}")
                .AddParameter("amount", $"{amount}")
                .AddParameter("type", $"{type}");

            var response = await _client.ExecuteAsync<TriviaQuestion>(request);

            if (response.IsSuccessful)
                return response.Data.Results;

            return null;
        }
    }
}
