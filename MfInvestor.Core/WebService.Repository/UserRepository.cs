using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using WebService.Contracts;
using WebService.DAL.Interface;
using Dapper;

namespace WebService.DAL
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        protected override string tableName { get => "User"; }

        public UserRepository(IConfiguration con)
             :base(con)
        {
                     
        }

        public void RegisterUser(UserRegistration user, string passwordSalt)
        {
            using (var connection = conn)
            {
                connection.Open();

                var param = new DynamicParameters();
                param.Add("@Email", user.EmailId);
                param.Add("@Password", user.Password);
                param.Add("@PassswordSalt", passwordSalt);
                param.Add("@MobileNumber", user.MobileNumber);

                conn.Execute("sp_RegisterUser", param, commandType: CommandType.StoredProcedure);
            }
        }

       
    }
}
