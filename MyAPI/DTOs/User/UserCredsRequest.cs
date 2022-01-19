using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.DTOs.User
{
    public class UserCredsRequest
    {
        [Required(ErrorMessage = "Nhập Email")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "Nhập mật khẩu")]
        public string Pass { get; set; }
    }
}
