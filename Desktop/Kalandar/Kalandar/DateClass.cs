using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kalandar
{
    public class DateClass
    {
        private int year;
        private int month;
        private int day;

        private int currentYear = DateTime.Now.Year;
        private int currentMonth = DateTime.Now.Month;
        private int currentDay = DateTime.Now.Day;

        public DateClass()
        {
            DateTime currentTime = DateTime.Now;
            Year = currentTime.Year;
            Month = currentTime.Month;
            Day = currentTime.Day;
        }

        public DateClass(int year, int month, int day)
        {
            Year = year;
            Month = month;
            Day = day;
        }

        public int Year { get => year; set => year = value; }
        public int Month { get => month; set => month = value; }
        public int Day { get => day; set => day = value; }
        public int CurrentYear { get => currentYear; set => currentYear = value; }
        public int CurrentMonth { get => currentMonth; set => currentMonth = value; }
        public int CurrentDay { get => currentDay; set => currentDay = value; }

        
    }
    
}
