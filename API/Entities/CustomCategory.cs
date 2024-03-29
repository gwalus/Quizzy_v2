using System.Collections.Generic;

namespace API.Entities
{
    public class CustomCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<CustomQuestion> Questions { get; set; }
    }
}