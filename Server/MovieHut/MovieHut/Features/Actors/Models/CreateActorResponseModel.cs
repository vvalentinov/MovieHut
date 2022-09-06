namespace MovieHut.Features.Actors.Models
{
    public class CreateActorResponseModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string UserId { get; set; }
    }
}
