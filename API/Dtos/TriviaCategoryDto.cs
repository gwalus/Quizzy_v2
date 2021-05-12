namespace API.Dtos
{
    public class TriviaCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TotalEasy { get; set; }
        public int TotalMedium { get; set; }
        public int TotalHard { get; set; }
    }
}
