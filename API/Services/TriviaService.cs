using API.Interfaces;
using API.Models.Trivia;
using RestSharp;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Services
{
    public class TriviaService : ITriviaService
    {
        private readonly RestClient _client = new RestClient("https://opentdb.com/api.php?");

        public async Task<IList<Category>> GetCategories()
        {
            var request = new RestRequest("https://opentdb.com/api_category.php");

            var response = await _client.ExecuteAsync<TriviaCategory>(request);

            if(response.IsSuccessful)
                return response.Data.Trivia_categories;

            return null;
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

        public async Task<IList<TriviaQuestion>> GetQuestions(string categoryId, string difficulty, string amount, string type)
        {
            var request = new RestRequest()
                .AddParameter("category", $"{categoryId}")
                .AddParameter("difficulty", $"{difficulty}")
                .AddParameter("amount", $"{amount}")
                .AddParameter("type", $"{type}");

            var response = await _client.ExecuteAsync<TriviaQuestions>(request);

            if (response.IsSuccessful)
            {
                return response.Data.Results;
            }

            return null;
        }
    }
}
