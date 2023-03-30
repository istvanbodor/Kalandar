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
    public partial class CalendarDayNumberUserControl : UserControl
    {
        private DateTime buttonDate;

        public CalendarDayNumberUserControl()
        {
            InitializeComponent();
            
        }

        public CalendarDayNumberUserControl(DateTime buttonDate)
        {
            this.buttonDate = buttonDate;
            InitializeComponent();
        }

        public void days(int numDay, bool sameDay)
        {
            if(btnDay != null)
            {
                if (sameDay == true)
                {
                    btnDay.Text = Convert.ToString(numDay);
                    btnDay.BackColor = Color.FromArgb(181, 130, 64);
                    btnDay.ForeColor = Color.FromArgb(255, 255, 255);
                }
                else
                {
                    btnDay.Text = Convert.ToString(numDay);
                    btnDay.BackColor = Color.FromArgb(60, 60, 60);
                    btnDay.ForeColor = Color.FromArgb(181, 130, 64);
                }
            }
            
            
        }
        private void btnDay_Click(object sender, EventArgs e)
        {
            AddEventForm eventForm = new AddEventForm();
            var now = DateTime.Now;

            eventForm.EndDateText = buttonDate.ToString("dd MMMM yyyy");
            eventForm.StartHourText = DateTime.Now.ToString("HH");
            eventForm.StartMinuteText = DateTime.Now.ToString("mm");
            eventForm.EndHourText = DateTime.Now.AddHours(1).ToString("HH");
            eventForm.EndMinuteText = DateTime.Now.ToString("mm");
            eventForm.DateText = buttonDate.ToString("dd MMMM yyyy");
            eventForm.DTPStartDate = new DateTime(buttonDate.Year, buttonDate.Month, buttonDate.Day);
            eventForm.StartDateText = eventForm.DTPStartDate.ToString("dd MMMM yyyy");

            if(buttonDate >= new DateTime(now.Year, now.Month, now.Day, 0, 0, 0))
            {
                eventForm.Show();
            }
            
        }
    }
}