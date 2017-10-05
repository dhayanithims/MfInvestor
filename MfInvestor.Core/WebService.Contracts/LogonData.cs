using System;
using System.Collections.Generic;
using System.Text;

namespace WebService.Contracts
{
    public class LogonData : IIdentity
    {
        public string UserName { get; set; }
        public long Id { get; set; }
        public string PwdSalt { get; set; }
        public string Password { get; set; }
        public DateTime LastLogin { get; set; }
        public DateTime LogoutTime { get; set; }
        public bool IsActive { get; set; }
        public int FailedAttempts { get; set; }
        public DateTime LastAttempt { get; set; }        
    } 
    
}
