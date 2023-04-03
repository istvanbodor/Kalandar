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
        

        public static bool acceptedForm { get; set; }

        public string EventsNumberText
        {
            get
            {
                return this.lblEventNumber.Text;
            }
            set
            {
                this.lblEventNumber.Text = value;
            }
        }

        private void btnExit_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnAddEvent_Click(object sender, EventArgs e)
        {
            
            using (AddEventForm addEventForm = new AddEventForm())
            {
                var counter = Convert.ToInt32(EventsNumberText.Split(' ')[0]);
                var now = DateTime.Now;
                acceptedForm = false;
                
                addEventForm.EndDateText = actualDate.ToString("dd MMMM yyyy");
                addEventForm.StartHourText = DateTime.Now.ToString("HH");
                addEventForm.StartMinuteText = DateTime.Now.ToString("mm");
                addEventForm.EndHourText = DateTime.Now.AddHours(1).ToString("HH");
                addEventForm.EndMinuteText = DateTime.Now.ToString("mm");
                addEventForm.DTPStartDate = new DateTime(actualDate.Year, actualDate.Month, actualDate.Day);
                addEventForm.StartDateText = addEventForm.DTPStartDate.ToString("dd MMMM yyyy");
                addEventForm.DTPEndDate = new DateTime(actualDate.Year, actualDate.Month, actualDate.Day, 0, 0, 0);
                addEventForm.EndDateText = addEventForm.DTPEndDate.ToString("dd MMMM yyyy");
                addEventForm.ShowDialog();
                if (actualDate >= new DateTime(now.Year, now.Month, now.Day) && acceptedForm == true)
                {
                    counter++;
                    EventsBlank eventForm = new EventsBlank();
                    eventForm.DateText = addEventForm.StartDateText + " " + addEventForm.StartHourText + " - " + addEventForm.EndDateText + "ezazdat";
                    eventForm.CategoryText = addEventForm.EventCategoryText;
                    eventForm.AddressCountryText = addEventForm.CountryText;
                    eventForm.AddressStreetHouseNoText = addEventForm.StreetText + " " + addEventForm.HouseNumberText;
                    eventForm.AddressZipCityText = addEventForm.ZipText + ", " + addEventForm.CityText;
                    pnlEvents.Controls.Add(eventForm);
                    pnlEvents.Controls.Add(eventForm);
                    EventsNumberText = counter + " event(s)";
                }
            }
        }
    }
}
