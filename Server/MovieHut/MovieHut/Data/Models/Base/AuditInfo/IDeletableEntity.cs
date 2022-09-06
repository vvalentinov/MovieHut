namespace MovieHut.Data.Models.Base.AuditInfo
{
    public interface IDeletableEntity : IEntity
    {
        DateTime? DeletedOn { get; set; }

        string? DeletedBy { get; set; }

        bool IsDeleted { get; set; }
    }
}
