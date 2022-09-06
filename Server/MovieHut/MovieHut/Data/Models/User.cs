namespace MovieHut.Data.Models
{
    using Microsoft.AspNetCore.Identity;
    using MovieHut.Data.Models.Base.AuditInfo;

    public class User : IdentityUser, IEntity
    {
        public User()
        {
            this.Movies = new HashSet<Movie>();
        }

        public virtual ICollection<Movie> Movies { get; set; }

        public DateTime CreatedOn { get; set; }

        public string? CreatedBy { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public string? ModifiedBy { get; set; }
    }
}
