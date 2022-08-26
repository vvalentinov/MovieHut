namespace MovieHut.Data.Models
{
    using Microsoft.AspNetCore.Identity;

    public class User : IdentityUser
    {
        public User()
        {
            this.Movies = new HashSet<Movie>();
        }

        public virtual ICollection<Movie> Movies { get; set; }
    }
}
