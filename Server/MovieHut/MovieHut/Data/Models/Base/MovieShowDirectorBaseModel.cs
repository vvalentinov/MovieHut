namespace MovieHut.Data.Models.Base
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.ComponentModel.DataAnnotations;

    public abstract class MovieShowDirectorBaseModel
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [ForeignKey(nameof(Director))]
        public int DirectorId { get; set; }

        public virtual Director Director { get; set; }
    }
}
