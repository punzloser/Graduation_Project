using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.DTOs.User
{
    public class UserDTO
    {
        public string Id { get; set; }

        public string Email { get; set; }

        public bool IsAdmin { get; set; }
    }
}
