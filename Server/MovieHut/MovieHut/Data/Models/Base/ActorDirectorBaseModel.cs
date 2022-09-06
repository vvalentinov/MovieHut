namespace MovieHut.Data.Models.Base
{
    using MovieHut.Data.Models.Base.AuditInfo;
    using System.ComponentModel.DataAnnotations;

    public abstract class ActorDirectorBaseModel : DeletableEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public virtual IFormFile ImageFile { get; set; }
    }
}
