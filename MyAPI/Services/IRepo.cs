using MyAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Services
{
    public interface IRepo
    {
        void AddGenre(Genre g);
        Task<Genre> GetById(int Id);
        Task<List<Genre>> GetListGenres();
    }
}
