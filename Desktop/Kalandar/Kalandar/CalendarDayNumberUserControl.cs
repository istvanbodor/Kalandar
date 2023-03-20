using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Kalandar
{
    public partial class CalendarDayNumberUserControl : UserControl
    {
        public CalendarDayNumberUserControl()
        {
            InitializeComponent();
        }
        public void days(int numDay, bool sameDay)
        {
            if (sameDay == true)
            {
                btnDay.Text = numDay + "";
                btnDay.BackColor = Color.FromArgb(181, 130, 64);
                btnDay.ForeColor = Color.FromArgb(255, 255, 255);
            }
            else
            {
                btnDay.Text = numDay + "";
                btnDay.BackColor = Color.FromArgb(60, 60, 60);
                btnDay.ForeColor = Color.FromArgb(181, 130, 64);
            }
            
        }

        private void btnDay_Click(object sender, EventArgs e)
        {
            Form eventForm = new UserEventsForm();
            eventForm.Show();
        }
    }
}
