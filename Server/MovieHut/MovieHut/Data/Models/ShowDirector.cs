namespace MovieHut.Data.Models
{
    using MovieHut.Data.Models.Base;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.ComponentModel.DataAnnotations;

    public class ShowDirector : MovieShowDirectorBaseModel
    {
        [Required]
        [ForeignKey(nameof(Show))]
        public string ShowId { get; set; }

        public virtual Show Show { get; set; }
    }
}
