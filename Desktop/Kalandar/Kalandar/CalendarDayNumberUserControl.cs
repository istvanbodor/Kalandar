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
            UserEventsForm eventForm = new UserEventsForm();

            eventForm.DateText = buttonDate.ToString("dd MMMM yyyy");
            eventForm.Show();
        }
    }
}