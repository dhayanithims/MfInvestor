using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using WebService.Contracts;
using WebService.DAL.Interface;

namespace WebService.DAL
{
    public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : class, IIdentity
    {
        protected IDbConnection conn;

        protected abstract string tableName { get;}

        public Repository(IConfiguration con)
        {
            this.conn = new MySqlConnection();
            this.conn.ConnectionString = con.GetConnectionString("DefaultConnection");           
        }        

        public void Delete(TEntity entity)
        {            
            string sql = string.Format(@"DELETE FROM {0} WHERE Id = @Identity;", tableName);
            using (var connection = conn)
            {
                connection.Open();
                connection.QueryFirstOrDefault<TEntity>(sql, new { Identity = entity.Id });
            }          
        }

        public TEntity Get(int Id)
        {
            TEntity entity;
            string sql = string.Format(@"SELECT * FROM {0} WHERE Id = @Identity;", tableName);
            using (var connection = conn)
            {
                connection.Open();
                entity = connection.QueryFirstOrDefault<TEntity>(sql, new { Identity = Id });
            }
            return entity;
        }

        public IEnumerable<TEntity> GetAll()
        {
            IEnumerable<TEntity> entities;
            string sql = string.Format(@"SELECT * FROM {0};", tableName);
            using (var connection = conn)
            {
                connection.Open();
                entities = connection.Query<TEntity>(sql);
            }
            return entities;
        }
        
    }
}
