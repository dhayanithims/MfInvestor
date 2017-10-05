using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;
using WebService.Contracts;
using WebService.DAL.Interface;

namespace WebService.DAL
{
    public class LogonRepository : Repository<LogonData>, ILogonRepository
    {
        protected override string tableName { get => "LogonData"; }

        public LogonRepository(IConfiguration con)
            : base(con)
        {

        }

        public LogonData GetLogon(string userName)
        {
            LogonData entity;
            string sql = string.Format(@"SELECT * FROM {0} WHERE UserName = @UserName;", tableName);
            using (var connection = conn)
            {
                connection.Open();
                entity = connection.QueryFirstOrDefault<LogonData>(sql, new { UserName = userName });
            }
            return entity;
        }
    }
}


