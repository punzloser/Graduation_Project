using MyAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Services
{
    public class MemoryRepo : IRepo
    {
        private List<Genre> _genres;
        public MemoryRepo()
        {
            _genres = new List<Genre>()
            {
                new Genre(){Id = 1, Name = "Comedy"},
                new Genre(){Id =  2, Name = "Action"}
            };
        }

        public List<Genre> GetListGenres()
        {
            return _genres;
        }

        public Genre GetById(int Id)
        {
            return _genres.Find(a => a.Id == Id);
        }
    }
}
