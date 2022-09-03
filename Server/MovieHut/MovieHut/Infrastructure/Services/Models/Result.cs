namespace MovieHut.Infrastructure.Services.Models
{
    public class Result
    {
        public bool Succeeded { get; private set; }

        public bool Failed { get { return Succeeded == false; } }

        public string Error { get; private set; }

        public static implicit operator Result(bool succeeded)
        {
            return new Result { Succeeded = succeeded };
        }

        public static implicit operator Result(string error)
        {
            return new Result { Succeeded = false, Error = error };
        }
    }
}
