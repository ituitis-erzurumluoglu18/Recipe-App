using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NHibernate;
using NHibernate.Cfg;
using RecipeApp.Domain;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace RecipeApp.Repositories
{
    public class NHibernateHelper
    {
        private static ISessionFactory _sessionFactory;

        private static ISessionFactory SessionFactory
        {
            get
            {
                if (_sessionFactory == null)
                {
                    var configuration = new Configuration();
                    //configuration.AddXmlFile(@"Mappings\User.hbm.xml");
                    //configuration.AddXmlFile("hibernate.cfg.xml");
                    configuration.Configure("hibernate.cfg.xml");
                    //configuration.AddFile(@"Mappings\Recipe.hbm.xml");
                    //var configurationPath = System.Web.Hosting.HostingEnvironment.MapPath(@"~\Models\hibernate.cfg.xml");
                    //var bookConfigurationFile = (@"~\Mappings\Book.hbm.xml");
                    //var configurationPath = Path.Combine((string)AppDomain.CurrentDomain.GetData("ContentRootPath"), "hibernate.cfg.xml");
                    //configuration.Configure(configurationPath);
                    //var userConfigurationFile = Path.Combine((string)AppDomain.CurrentDomain.GetData("ContentRootPath"), @"~\Mappings\User.hbm.xml");
                    //configuration.AddFile(userConfigurationFile);
                    //configuration.AddAssembly(typeof(User).Assembly);
                    _sessionFactory = configuration.BuildSessionFactory();
                }
                return _sessionFactory;
            }
        }

        public static ISession OpenSession()
        {
            return SessionFactory.OpenSession();
        }
    }
}
