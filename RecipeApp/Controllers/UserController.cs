using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecipeApp.Domain;
using RecipeApp.Repositories;

namespace RecipeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        //private readonly ILogger<WeatherForecastController> _logger;

        //public WeatherForecastController(ILogger<WeatherForecastController> logger)
        //{
        //    _logger = logger;
        //}

        private IUserRepository _userService;

        public UserController()
        {
            _userService = new UserRepository();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var users = await _userService.GetAllUser();
            if (users != null)
            {
                return Ok(users);
            }
            return NotFound();
        }
        //public List<User> Get()
        //{
        //    var users = _userService.GetAllUser();
        //    return users;
        //}


        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            var user = _userService.GetById(id);
            if (user != null)
            {
                return Ok(user);
            }
            return NotFound();
        }
    }
}
