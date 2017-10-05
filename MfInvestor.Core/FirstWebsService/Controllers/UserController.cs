using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WebService.Business;
using WebService.Contracts;
using System.Net.Http;

namespace FirstWebsService.Controllers
{
    [Route("api/[controller]")]    
    public class UserController : Controller
    {
        private ILogOnService _logonService;

        public UserController(ILogOnService logonService)
        {
            this._logonService = logonService;

        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]UserRegistration user)
        {
            _logonService.Register(user);           
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpPost]
        public HttpResponseMessage Authenticate(string userName, string password)
        {
            _logonService.Authenticate(userName, password);
        }


    }
}