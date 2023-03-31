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
    public partial class UserEventsForm : Form
    {
        private DateClass selectedDate = new DateClass();
        public UserEventsForm()
        {
            InitializeComponent();
        }
        DateTime actualDate;
        public DateTime ActualDate
        {
            set
            {
                actualDate = value;
            }
        }
        public string DateText
        {
            get
            {
                return this.lblDate.Text;
            }
            set
            {
                this.lblDate.Text = value;
            }
        }
        private void btnExit_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnAddEvent_Click(object sender, EventArgs e)
        {
            AddEventForm addEventForm = new AddEventForm();
            var now = DateTime.Now;

            addEventForm.EndDateText = actualDate.ToString("dd MMMM yyyy");
            addEventForm.StartHourText = DateTime.Now.ToString("HH");
            addEventForm.StartMinuteText = DateTime.Now.ToString("mm");
            addEventForm.EndHourText = DateTime.Now.AddHours(1).ToString("HH");
            addEventForm.EndMinuteText = DateTime.Now.ToString("mm");
            addEventForm.DTPStartDate = new DateTime(actualDate.Year, actualDate.Month, actualDate.Day);
            addEventForm.StartDateText = addEventForm.DTPStartDate.ToString("dd MMMM yyyy");

            if (actualDate >= new DateTime(now.Year, now.Month, now.Day, 0, 0, 0))
            {
                addEventForm.Show();
            }
        }
    }
}
