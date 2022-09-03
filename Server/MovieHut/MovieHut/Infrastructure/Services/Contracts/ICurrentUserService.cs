namespace MovieHut.Infrastructure.Services.Contracts
{
    public interface ICurrentUserService
    {
        string GetUserName();

        string GetId();
    }
}
