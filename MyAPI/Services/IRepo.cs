using MyAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Services
{
    public interface IRepo
    {
        Genre GetById(int Id);
        List<Genre> GetListGenres();
    }
}
