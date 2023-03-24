using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kalandar
{
    internal class CurrentUser
    {
        public string token { get; set; }
        public string username { get; set; }

        public string UserToken
        {
            get
            {
                return this.token;
            }
            set
            {
                this.token = value;
            }
        }
    }
}
