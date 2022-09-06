namespace MovieHut.Data.Models.Base.AuditInfo
{
    public interface IEntity
    {
        DateTime CreatedOn { get; set; }

        string? CreatedBy { get; set; }

        DateTime? ModifiedOn { get; set; }

        string? ModifiedBy { get; set; }
    }
}
