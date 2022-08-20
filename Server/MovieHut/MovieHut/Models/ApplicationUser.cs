namespace MovieHut.Models
{
    using Microsoft.AspNetCore.Identity;
    using System.ComponentModel.DataAnnotations.Schema;

    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            // this.Id = Guid.NewGuid().ToString();
            this.Movies = new List<Movie>();
            this.Comments = new List<Comment>();
        }

        public string RoleId { get; set; }

        [ForeignKey(nameof(RoleId))]
        public virtual ApplicationRole Role { get; set; }

        public virtual ICollection<Movie> Movies { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}
