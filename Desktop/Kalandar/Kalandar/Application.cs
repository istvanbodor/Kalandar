using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Kalandar
{
    public partial class Application : Form
    {
        public DateTime currentTime { get; set; }
        public int year = 10;
        public int month { get; set; }
        public int day { get; set; }
        public Application()
        {
            InitializeComponent();
            currentTime = DateTime.Now;
            year = currentTime.Year;
            month = currentTime.Month;
            day = currentTime.Day;
            generateCalendar();
            editDateText();
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
            lblTopBar.Text = String.Format("{0}. {1}", year, date.ToString("MMMM"));
        }

        private void generateEvents()
        {

            for (int i = 0; i < 15; i++)
            {
                EventsBlank eventsBlank = new EventsBlank();
                pnlCalendar.Controls.Add(eventsBlank);
            }
        }

        private void generateUsers()
        {

            for (int i = 0; i < 15; i++)
            {
                UsersUserControl usersUC = new UsersUserControl();
                pnlCalendar.Controls.Add(usersUC);
            }
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

        private void btnEsemenyek_Click(object sender, EventArgs e)
        {
            btnCalendar.BackColor = Color.FromArgb(60, 60, 60);
            btnEvents.BackColor = Color.FromArgb(181, 130, 64);
            btnUsers.BackColor = Color.FromArgb(60, 60, 60);
            pnlCalendar.Controls.Clear();
            pctrNextMonth.Hide();
            pctrPrevMonth.Hide();
            pnlWeekdays.Hide();
            generateEvents();
            lblTopBar.Text = "Események";
            

        }
        
        private void btnKalendar_Click(object sender, EventArgs e)
        {
            btnCalendar.BackColor = Color.FromArgb(181, 130, 64);
            btnEvents.BackColor = Color.FromArgb(60, 60, 60);
            btnUsers.BackColor = Color.FromArgb(60, 60, 60);
            pnlCalendar.Controls.Clear();
            pctrNextMonth.Show();
            pctrPrevMonth.Show();
            generateCalendar();
            pnlWeekdays.Show();
            editDateText();
            
        }

        private void btnUsers_Click(object sender, EventArgs e)
        {
            btnCalendar.BackColor = Color.FromArgb(60, 60, 60);
            btnEvents.BackColor = Color.FromArgb(60, 60, 60);
            btnUsers.BackColor = Color.FromArgb(181, 130, 64);
            pnlCalendar.Controls.Clear();
            pctrNextMonth.Hide();
            pctrPrevMonth.Hide();
            pnlWeekdays.Hide();
            generateUsers();
        }
    }
}
