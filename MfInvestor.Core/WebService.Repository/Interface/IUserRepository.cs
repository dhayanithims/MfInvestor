using System;
using System.Collections.Generic;
using System.Text;
using WebService.Contracts;

namespace WebService.DAL.Interface
{
    public interface IUserRepository : IRepository<User>
    {
       void RegisterUser(UserRegistration user, string passwordSalt);
    }
}
