using System.Collections.Generic;
using WebService.Contracts;

namespace WebService.Business
{
    public interface ILogOnService
    {
        IEnumerable<User> GetLogOnUsers();

        void Register(UserRegistration user);

        bool Authenticate(string userName, string password);
    }
}