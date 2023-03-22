using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Kalandar
{
    public partial class Kalandar : Form
    {
        private DateClass selectedDate = new DateClass();

        public int GetYear
        {
            get { return Convert.ToInt32(selectedDate.Year); }
        }
        public int GetMonth
        {
            get { return Convert.ToInt32(selectedDate.Month); }
        }
        public int GetDay
        {
            get { return Convert.ToInt32(selectedDate.Day); }
        }
        


        public Kalandar()
        {
            InitializeComponent();
            generateCalendar();
            editDateText();
        }

        private void btnExit_Click(object sender, EventArgs e)
        {
            System.Windows.Forms.Application.Exit();
        }

        private void generateCalendar()
        {

            DateTime firstDayOfMonth = new DateTime(selectedDate.Year, selectedDate.Month, 1);

            int days = DateTime.DaysInMonth(selectedDate.Year, selectedDate.Month);

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
                CalendarDayNumberUserControl ucDayNumber = new CalendarDayNumberUserControl(new DateTime(GetYear, GetMonth, i));
                
                if(i == GetDay && GetMonth == selectedDate.CurrentMonth && GetYear == selectedDate.CurrentYear)
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
            Trace.WriteLine(GetDay);
            Trace.WriteLine(GetMonth);
            Trace.WriteLine(selectedDate.CurrentMonth + " asd");
        }


        private void editDateText()
        {
            DateTime date = new DateTime(selectedDate.Year, selectedDate.Month, 1);
            lblTopBar.Text = String.Format("{0}", date.ToString("MMMM, yyyy"));
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
            selectedDate = new DateClass(GetYear, GetMonth + 1, GetDay);

            if (GetMonth == 13)
            {
                selectedDate.Month = 1;
                selectedDate.Year++;
            }

            editDateText();
            generateCalendar();
        }

        private void pctrPrevMonth_Click(object sender, EventArgs e)
        {
            pnlCalendar.Controls.Clear();
            selectedDate = new DateClass(GetYear, GetMonth - 1, GetDay);

            if (GetMonth == 0)
            {
                selectedDate.Month = 12;
                selectedDate.Year--;
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
            pnlHeader.Hide();
            

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
            pnlHeader.Show();

        }

        private void btnUsers_Click(object sender, EventArgs e)
        {
            pnlWeekdays.Hide();
            pnlHeader.Show();
            btnCalendar.BackColor = Color.FromArgb(60, 60, 60);
            btnEvents.BackColor = Color.FromArgb(60, 60, 60);
            btnUsers.BackColor = Color.FromArgb(181, 130, 64);
            pnlCalendar.Controls.Clear();
            pctrNextMonth.Hide();
            pctrPrevMonth.Hide();
            generateUsers();
        }

        private void btnLogout_Click(object sender, EventArgs e)
        {
            this.Hide();
            Login loginForm = new Login();
            loginForm.ShowDialog();
        }
    }
}
