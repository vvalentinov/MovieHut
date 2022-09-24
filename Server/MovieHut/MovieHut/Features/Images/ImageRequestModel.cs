namespace MovieHut.Features.Images
{
    public class ImageRequestModel
    {
        public string FolderName { get; set; }

        public IFormFile ImageFile { get; set; }
    }
}
