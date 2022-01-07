using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Constants
{
    public class SystemConstants
    {
        public const string AzureStorageConnection = "AzureStorage";

        public class ContainerName
        {
            public const string actors = "actors";

            public const string movies = "movies";
        }

        public const int Top = 5;
    }
}
