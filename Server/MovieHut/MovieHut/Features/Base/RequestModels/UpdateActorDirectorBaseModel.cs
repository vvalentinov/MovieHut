namespace MovieHut.Features.Base.RequestModels
{
    public abstract class UpdateActorDirectorBaseModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }
    }
}
