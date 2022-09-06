namespace MovieHut.Features.Actors.Models
{
    using System.ComponentModel.DataAnnotations;

    public class CreateActorRequestModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string ImageUrl { get; set; }
    }
}
