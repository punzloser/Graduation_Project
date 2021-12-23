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

        public async Task<List<Genre>> GetListGenres()
        {
            await Task.Delay(100);
            return _genres;
        }

        public async Task<Genre> GetById(int Id)
        {
            await Task.Delay(1);
            return _genres.Find(a => a.Id == Id);
        }

        public void AddGenre(Genre g)
        {
            g.Id = _genres.Max(a => a.Id) + 1;
            _genres.Add(g);
        }

    }
}
