using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Kalandar
{
    public partial class Application : Form
    {

        DateTime currentTime;
        int year;
        int month;
        int day;
        
        public Application()
        {
            InitializeComponent();
            currentTime = DateTime.Now;
            year = currentTime.Year;
            month = currentTime.Month;
            day = currentTime.Day;
            generateCalendar();
        }

        private void btnExit_Click(object sender, EventArgs e)
        {
            System.Windows.Forms.Application.Exit();
        }

       

        private void generateCalendar()
        {

            DateTime firstDayOfMonth = new DateTime(year, month, 1);

            int days = DateTime.DaysInMonth(year, month);

            int dayOfTheWeek = Convert.ToInt32(firstDayOfMonth.DayOfWeek.ToString("d")) - 1;
            Trace.WriteLine(dayOfTheWeek);

            if (dayOfTheWeek == -1)
            {
                dayOfTheWeek = 6;
            }

            for (int i = 1; i <= dayOfTheWeek; i++)
            {
                
                CalendarDateBlank dateControl = new CalendarDateBlank();

                pnlCalendar.Controls.Add(dateControl);
            }

            for (int i = 1; i <= days; i++)
            {
                CalendarDayNumberUserControl ucDayNumber = new CalendarDayNumberUserControl();
                if(i == day && year == currentTime.Year && month == currentTime.Month)
                {
                    ucDayNumber.days(i, true);
                    pnlCalendar.Controls.Add(ucDayNumber);
                }
                else
                {
                    ucDayNumber.days(i, false);
                    pnlCalendar.Controls.Add(ucDayNumber);
                }
                
                
            }


        }

        private void editDateText()
        {
            DateTime date = new DateTime(year, month, 1);
            lblDatum.Text = String.Format("{0}. {1}", year, date.ToString("MMMM", new System.Globalization.CultureInfo("hu-HU")));
        }

        private void pctrNextMonth_Click(object sender, EventArgs e)
        {
            pnlCalendar.Controls.Clear();
            month++;
            if(month==13)
            {
                month = 1;
                year++;
            }
            editDateText();
            generateCalendar();

        }

        private void pctrPrevMonth_Click(object sender, EventArgs e)
        {
            pnlCalendar.Controls.Clear();
            month--;
            if (month == 0)
            {
                month = 12;
                year--;
            }
            editDateText();
            generateCalendar();
        }
    }
}
