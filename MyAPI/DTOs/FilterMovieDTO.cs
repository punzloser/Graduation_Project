using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.DTOs
{
    public class FilterMovieDTO
    {
        public int Page { get; set; } = 1;

        public int RecordsPerPage { get; set; } = 10;

        public PaginationDTO PaginationDTO
        {
            get { return new PaginationDTO() { Page = Page, RecordsPerPage = RecordsPerPage }; }
        }

        public string Title { get; set; }

        public bool UpcomingReleases { get; set; }

        public bool InTheaters { get; set; }

        public int GenreId { get; set; }

    }
}
