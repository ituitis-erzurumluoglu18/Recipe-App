using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Net.Http;
using NHibernate;
using NHibernate.Cfg;
using RecipeApp.Domain;
//using Microsoft.AspNetCore.Http;

namespace RecipeApp
{
    public sealed class NHibernateSession
    {
        private static ISessionFactory _sessionFactory;

        private static ISessionFactory SessionFactory
        {
            get
            {
                if (_sessionFactory == null)
                {
                    var configuration = new Configuration();
                    configuration.Configure();
                    configuration.AddAssembly(typeof(User).Assembly);
                    _sessionFactory = configuration.BuildSessionFactory();
                }
                return _sessionFactory;
            }
        }

        public static ISession OpenSession()
        {
            return SessionFactory.OpenSession();
        }
        /*
        public static ISession OpenSession()
        {
            var configuration = new Configuration();
            var configurationPath = HttpContext.Current.Server.MapPath(@"~\Models\hibernate.cfg.xml");
            configuration.Configure(configurationPath);
            var bookConfigurationFile = HttpContext.Current.Server.MapPath(@"~\Mappings\Book.hbm.xml");
            configuration.AddFile(bookConfigurationFile);
            ISessionFactory sessionFactory = configuration.BuildSessionFactory();
            return sessionFactory.OpenSession();
        }
        */
        //private const string CurrentSessionKey = "nhibernate.current_session";
        //private static readonly ISessionFactory _sessionFactory;

        //static NHibernateSession()
        //{
        //    _sessionFactory = new Configuration().Configure().BuildSessionFactory();
        //}

        //public static ISession GetCurrentSession()
        //{
        //    var context = System.Web.HttpContext.Current;
        //    //var context = IHttpContextAccessor.S;
        //    var currentSession = context.Items[CurrentSessionKey] as ISession;

        //    if (currentSession == null)
        //    {
        //        currentSession = _sessionFactory.OpenSession();
        //        context.Items[CurrentSessionKey] = currentSession;
        //    }

        //    return currentSession;
        //}

        //public static void CloseSession()
        //{
        //    var context = HttpContext.Session;
        //    var currentSession = context.Items[CurrentSessionKey] as ISession;

        //    if (currentSession == null)
        //    {
        //        // No current session
        //        return;
        //    }

        //    currentSession.Close();
        //    context.Items.Remove(CurrentSessionKey);
        //}

        //public static void CloseSessionFactory()
        //{
        //    if (_sessionFactory != null)
        //    {
        //        _sessionFactory.Close();
        //    }
        //}
    }
}
