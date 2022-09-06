namespace MovieHut.Data.Models
{
    using MovieHut.Data.Models.Base;
    using System.ComponentModel.DataAnnotations.Schema;

    public class ShowActor : MovieShowActorBaseModel
    {
        [ForeignKey(nameof(Show))]
        public string ShowId { get; set; }

        public virtual Show Show { get; set; }
    }
}
