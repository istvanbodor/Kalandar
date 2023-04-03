using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kalandar
{
    internal class EventClass
    {
        public string id { get; set; }
        public string @event { get; set; }
        public string startTime { get; set; }
        public string endTime { get; set; }
        public bool fullDay { get; set; }
        public string category { get; set; }
        public string username { get; set; }
        public AddressClass address { get; set; }
        public CurrentUser user { get; set; }
    }
}
