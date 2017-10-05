using System;
using System.Collections.Generic;
using System.Text;
using WebService.Contracts;

namespace WebService.DAL.Interface
{
    public interface ILogonRepository
    {
        LogonData GetLogon(string userName);
    }
}
