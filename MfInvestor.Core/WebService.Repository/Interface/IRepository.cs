using System;
using System.Collections.Generic;
using System.Text;
using WebService.Contracts;

namespace WebService.DAL.Interface
{
    public interface IRepository<TEntity> where TEntity : class, IIdentity
    {
        TEntity Get(int Id);
        IEnumerable<TEntity> GetAll();       
        void Delete(TEntity entity);        
    }
}
