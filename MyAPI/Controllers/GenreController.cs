using MyAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Controllers
{
    public class GenreController
    {
        private readonly IRepo _repo;

        public GenreController(IRepo repo)
        {
            _repo = repo;
        }
    }
}
