namespace MovieHut.Models
{
    using Microsoft.AspNetCore.Identity;

    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole()
        {
            this.Users = new HashSet<ApplicationUser>();
        }

        public virtual ICollection<ApplicationUser> Users { get; set; }
    }
}
