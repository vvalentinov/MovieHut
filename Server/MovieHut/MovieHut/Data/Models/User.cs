namespace MovieHut.Data.Models
{
    using Microsoft.AspNetCore.Identity;
    using MovieHut.Data.Models.Base.AuditInfo;

    public class User : IdentityUser, IEntity
    {
        public User()
        {
            this.Movies = new HashSet<Movie>();
            this.Shows = new HashSet<Show>();
            this.Actors = new HashSet<Actor>();
            this.Directors = new HashSet<Director>();
        }

        public virtual ICollection<Movie> Movies { get; set; }

        public virtual ICollection<Show> Shows { get; set; }

        public virtual ICollection<Actor> Actors { get; set; }

        public virtual ICollection<Director> Directors { get; set; }

        public DateTime CreatedOn { get; set; }

        public string? CreatedBy { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public string? ModifiedBy { get; set; }
    }
}
