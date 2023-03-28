using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kalandar
{
    internal class EventClass
    {
        public int Id { get; set; }
        public string Event { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public bool FullDay { get; set; }
        public string Category { get; set; }
        public string Username { get; set; }
        public string AddressId { get; set; }
    }
}
