using System;

namespace WebService.Contracts
{
    public class User : IIdentity {

        public string FirstName { get; set; }
        public long Id { get ; set ; }
        public string EmailId { get; set; }
        public string Password { get; set; }
        public string MobileNumber { get; set; }
    } 

    public class UserRegistration
    {
        public string EmailId { get; set; }
        public string Password { get; set; }
        public string MobileNumber { get; set; }
    }

    public interface IIdentity
    {
        long Id { get; set; }
    }
}
