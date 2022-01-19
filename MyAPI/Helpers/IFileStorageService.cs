using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Helpers
{
    public interface IFileStorageService
    {
        Task<string> SaveFile(string containerName, IFormFile file);

        Task DelFile(string containerName, string fileRoute);

        Task<string> EditFile(string containerName, IFormFile file, string fileRoute);
    }
}
