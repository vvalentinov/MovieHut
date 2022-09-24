namespace MovieHut.Features.Images
{
    public class UpdateImageRequestModel
    {
        public string Url { get; set; }

        public IFormFile ImageFile { get; set; }

        public string FolderName { get; set; }
    }
}
