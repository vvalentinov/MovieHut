namespace MovieHut.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using static DataConstants;

    public class Comment
    {
        public int Id { get; set; }

        [Required]
        [MinLength(CommentMinLenght)]
        [MaxLength(CommentMaxLenght)]
        public string Content { get; set; }

        public string MovieId { get; set; }

        [ForeignKey(nameof(MovieId))]
        public virtual Movie Movie { get; set; }
        
        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual ApplicationUser User { get; set; }
    }
}
