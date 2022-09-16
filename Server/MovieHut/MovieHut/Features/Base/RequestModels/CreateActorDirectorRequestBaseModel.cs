namespace MovieHut.Features.Base.RequestModels
{
    using System.ComponentModel.DataAnnotations;

    public abstract class CreateActorDirectorRequestBaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [Required]
        public string UserId { get; set; }
    }
}
