﻿namespace MovieHut.Infrastructure.Services.Contracts
{
    public interface ICloudinaryService
    {
        Task<string> UploadImageAsync(IFormFile imageFile);
    }
}