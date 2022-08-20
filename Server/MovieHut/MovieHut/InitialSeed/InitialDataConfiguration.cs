namespace MovieHut.InitialSeed
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Newtonsoft.Json;

    public class InitialDataConfiguration<T> : IEntityTypeConfiguration<T>
        where T : class
    {
        private readonly string filePath;

        public InitialDataConfiguration(string filePath)
        {
            this.filePath = filePath;
        }

        public void Configure(EntityTypeBuilder<T> builder)
        {
            string? jsonData = GetFromFile();

            if (jsonData != null)
            {
                List<T> data = JsonConvert.DeserializeObject<List<T>>(jsonData);

                builder.HasData(data);
            }
        }

        private string? GetFromFile()
        {
            string? result = null;

            if (File.Exists(this.filePath))
            {
                result = File.ReadAllText(this.filePath);
            }

            return result;
        }
    }
}
