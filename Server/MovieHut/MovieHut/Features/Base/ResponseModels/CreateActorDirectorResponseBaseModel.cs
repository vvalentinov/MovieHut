namespace MovieHut.Features.Base.ResponseModels
{
    public abstract class CreateActorDirectorResponseBaseModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string UserId { get; set; }
    }
}
