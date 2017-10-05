using System;
using System.Collections;
using System.Collections.Generic;
using WebService.Contracts;
using WebService.DAL.Interface;

namespace WebService.Business
{
    public class LogOnService  : ILogOnService
    {
        private IUserRepository _userRepo;

        private ILogonRepository _logonRepo;

        public LogOnService(IUserRepository userRepository, ILogonRepository logonRepository)
        {
            _userRepo = userRepository;
            _logonRepo = logonRepository;
        }

        public IEnumerable<User> GetLogOnUsers()
        {
           return _userRepo.GetAll();
        }

        public void Register(UserRegistration user)
        {
            try
            {
                string passwordSalt = Guid.NewGuid().ToString().Replace("-", "");
                string encryptedPassword = CryptographyHelpers.Encrypt(passwordSalt, user.Password);
                user.Password = encryptedPassword;
                _userRepo.RegisterUser(user, passwordSalt);
            }
            catch (Exception ex)
            {
                
            }
        }

        public bool Authenticate(string userName, string password)
        {
            bool isValid = false;
            LogonData logon = _logonRepo.GetLogon(userName.Trim());
            string decrptPassword = CryptographyHelpers.Decrypt(logon.PwdSalt, logon.Password);
            if (password.Equals(decrptPassword))
            {
                isValid = true;
            }
            return isValid;
        }
    }
}
