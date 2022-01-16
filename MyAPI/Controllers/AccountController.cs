using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MyAPI.Constants;
using MyAPI.DTOs;
using MyAPI.DTOs.User;
using MyAPI.Helpers;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MyAPI.Controllers
{
    [Route("api/tai-khoan")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly MyDbContext _db;
        private readonly IMapper _mapper;

        public AccountController(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IConfiguration configuration,
            MyDbContext db,
            IMapper mapper
            )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _db = db;
            _mapper = mapper;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthenResponse>> Register([FromBody] UserCredsRequest userCreds)
        {
            var user = new IdentityUser()
            {
                UserName = userCreds.Email,
                Email = userCreds.Email
            };

            var result = await _userManager.CreateAsync(user, userCreds.Pass);

            if (result.Succeeded)
            {
                return await BuildToken(userCreds);
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthenResponse>> Login([FromBody] UserCredsRequest userCreds)
        {
            var result =
                await _signInManager.PasswordSignInAsync(userCreds.Email, userCreds.Pass, false, false);

            if (result.Succeeded)
            {
                return await BuildToken(userCreds);
            }
            else
            {
                return BadRequest("Đăng nhập không hợp lệ");
            }
        }

        private async Task<AuthenResponse> BuildToken(UserCredsRequest userCreds)
        {
            var findUserByMail = await _userManager.FindByEmailAsync(userCreds.Email);
            var result = await _db.UserClaims
                .FirstOrDefaultAsync(a => a.UserId == findUserByMail.Id);
            var claims = new List<Claim>();

            if (result != null)
            {
                var type = result.ClaimType;
                var value = result.ClaimValue;
                claims.Add(new Claim(type: "email", value: userCreds.Email));
                claims.Add(new Claim(type: type, value: value));
            }
            else
            {
                claims.Add(new Claim(type: "email", value: userCreds.Email));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration[SystemConstants.Key]));
            var creds = new SigningCredentials(key: key, algorithm: SecurityAlgorithms.HmacSha256);
            var exp = DateTime.UtcNow.AddDays(1);
            var token =
                new JwtSecurityToken(issuer: null, audience: null, claims: claims, expires: exp, signingCredentials: creds);

            return new AuthenResponse()
            {
                Expiration = exp,
                Token = new JwtSecurityTokenHandler().WriteToken(token)
            };
        }

        [HttpGet("getuserbyid")]
        public async Task<ActionResult<UserDTO>> GetUserById([FromBody] string userId)
        {
            var user = await _db.Users.FindAsync(userId);
            if (user != null)
            {
                bool isAdmin = false;

                var check = await _db.UserClaims
                    .Where(a => a.ClaimValue == "admin")
                    .FirstOrDefaultAsync(a => a.UserId == userId);

                if (check != null) { isAdmin = true; }

                var result = _mapper.Map<UserDTO>(user);
                result.IsAdmin = isAdmin;

                return result;
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("listuser")]
        public async Task<ActionResult<List<UserDTO>>> GetListUser([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = _db.Users.AsQueryable();
            await HttpContext.InsertParametesPaginationInHeader(queryable);

            var listuser = await queryable
                .OrderBy(a => a.Email)
                .Paginate(paginationDTO)
                .ToListAsync();

            var result = _mapper.Map<List<UserDTO>>(listuser);

            foreach (var user in result)
            {
                var GetUserByIdResult = GetUserById(user.Id).Result;
                var check = GetUserByIdResult.Value.IsAdmin;
                user.IsAdmin = check;
            }

            return Ok(result);
        }

        [HttpPost("setadmin")]
        public async Task<ActionResult> SetAdmin([FromBody] string userId)
        {
            //var test = await _db.Users.FindAsync(userId);
            var thisUser = await _userManager.FindByIdAsync(userId);
            if (thisUser != null)
            {
                await _userManager.AddClaimAsync(thisUser, new Claim(type: "role", value: "admin"));
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost("removeadmin")]
        public async Task<ActionResult> RemoveAdmin([FromBody] string userId)
        {
            var thisUser = await _userManager.FindByIdAsync(userId);
            if (thisUser != null)
            {
                await _userManager.RemoveClaimAsync(thisUser, new Claim(type: "role", value: "admin"));
            }
            else
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpDelete("removeuser")]
        [AllowAnonymous]
        public async Task<ActionResult> DelUser(string userId)
        {
            var rateOfUser = await _db.Ratings.Where(a => a.UserId == userId).ToListAsync();
            _db.Ratings.RemoveRange(rateOfUser);

            var delUser = await _db.Users.FindAsync(userId);
            _db.Users.Remove(delUser);

            await _db.SaveChangesAsync();

            return Ok();
        }
    }
}
