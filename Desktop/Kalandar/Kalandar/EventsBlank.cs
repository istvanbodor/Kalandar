using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Kalandar
{
    public partial class EventsBlank : UserControl
    {

        private string baseURL = APIConnectDetails.baseURL;
        private string token = CurrentUser.userToken;
        public static bool eventsView;
        public EventsBlank()
        {
            InitializeComponent();
        }

        public static bool acceptedForm { get; set; }
        public static bool eventFullDay { get; set; }
        public static string eventTitle { get; set; }
        public static string eventCategory { get; set; }
        public static string eventStartDate { get; set; }
        public static string eventStartHour { get; set; }
        public static string eventStartMinute { get; set; }
        public static string eventEndDate { get; set; }
        public static string eventEndHour { get; set; }
        public static string eventEndMinute { get; set; }
        public static string eventCountry { get; set; }
        public static string eventZipCode { get; set; }
        public static string eventCity { get; set; }
        public static string eventStreet { get; set; }
        public static string eventHouseNumber { get; set; }

        public string TitleText
        {
            get
            {
                return this.lblTitle.Text;
            }
            set
            {
                this.lblTitle.Text = value;
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
        public string CategoryText
        {
            get
            {
                return this.lblCategory.Text;
            }
            set
            {
                this.lblCategory.Text = value;
            }
        }
        public string IsFullDayText
        {
            get
            {
                return this.lblFullDay.Text;
            }
            set
            {
                this.lblFullDay.Text = value;
            }
        }
        public string AddressZipCityText
        {
            get
            {
                return this.lblZipCity.Text;
            }
            set
            {
                this.lblZipCity.Text = value;
            }
        }
        public string AddressCountryText
        {
            get
            {
                return this.lblCountry.Text;
            }
            set
            {
                this.lblCountry.Text = value;
            }
        }
        public string AddressStreetHouseNoText
        {
            get
            {
                return this.lblStreetHouseNo.Text;
            }
            set
            {
                this.lblStreetHouseNo.Text = value;
            }
        }

        public string LabelIdText
        {
            get
            {
                return this.lblId.Text;
            }
            set
            {
                this.lblId.Text = value;
            }
        }
        private void btnRemove_Click(object sender, EventArgs e)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
                    var endpoint = new Uri(baseURL + "api/events");
                    var response = client.DeleteAsync(endpoint + $"/{this.lblId.Text}").Result;
                    Trace.WriteLine(endpoint + $"/{this.lblId.Text}");
                    Trace.WriteLine("asd " + this.lblId.Text);
                    response.EnsureSuccessStatusCode();
                    this.Hide();
                }
                catch (HttpRequestException error)
                {
                    Trace.Write(error.Message);
                }
            }
        }

        private void btnModify_Click(object sender, EventArgs e)
        {
            acceptedForm = false;
            string[] dateArray = lblDate.Text.Split('-', ' ', ':');

            DateTime startDate = new DateTime(
                Convert.ToInt32(dateArray[0]),
                Convert.ToInt32(dateArray[1]),
                Convert.ToInt32(dateArray[2])
                );

            DateTime endDate = new DateTime(
                Convert.ToInt32(dateArray[8]),
                Convert.ToInt32(dateArray[9]),
                Convert.ToInt32(dateArray[10])
                );

            using (AddEventForm addEventForm = new AddEventForm())
            {
                addEventForm.StartHourText = dateArray[3];
                addEventForm.StartMinuteText = dateArray[4];
                addEventForm.EndHourText = dateArray[11];
                addEventForm.EndMinuteText = dateArray[12];
                addEventForm.DTPStartDate = startDate;
                addEventForm.StartDateText = addEventForm.DTPStartDate.ToString("dd MMMM yyyy");
                addEventForm.DTPEndDate = endDate;
                addEventForm.EndDateText = addEventForm.DTPEndDate.ToString("dd MMMM yyyy");
                addEventForm.APIMethod = "Edit";
                addEventForm.EventId = this.lblId.Text;
                addEventForm.ZipText = this.lblZipCity.Text.Split(',')[0];
                addEventForm.CityText = this.lblZipCity.Text.Split(',')[1];
                addEventForm.EventTitleText = this.lblTitle.Text;
                addEventForm.EventCategoryText = this.lblCategory.Text;
                addEventForm.StreetText = this.lblStreetHouseNo.Text.Split(',')[0];
                Trace.WriteLine(this.lblStreetHouseNo.Text);
                Trace.WriteLine(this.lblTitle.Text);
                addEventForm.TitleText = "MODIFY EVENT";
                addEventForm.ButtonText = "MODIFY EVENT";
                addEventForm.ShowDialog();
                if (acceptedForm && startDate == DateTime.Parse(eventStartDate) && !eventsView)
                {
                    this.lblTitle.Text = eventTitle;
                    this.lblCategory.Text = eventCategory;
                    this.lblDate.Text = DateTime.Parse(eventStartDate).ToString("yyyy-MM-dd") + 
                        " " +
                        eventStartHour + 
                        ":" +
                        eventStartMinute + ":00 - " +
                        DateTime.Parse(eventEndDate).ToString("yyyy-MM-dd") +
                        " " + eventEndHour + ":" + eventEndMinute + ":00";
                    this.lblCountry.Text = eventCountry;
                    this.lblZipCity.Text = eventZipCode + "," + eventCity;
                    this.lblStreetHouseNo.Text = eventStreet + " " + eventHouseNumber;
                    this.lblFullDay.Text = eventFullDay ? "Full Day" : "";
                }
                else if(acceptedForm && !eventsView)
                {

                    this.Hide();
                }
                else if (eventsView && acceptedForm)
                {
                    this.lblTitle.Text = eventTitle;
                    this.lblCategory.Text = eventCategory;
                    this.lblDate.Text = DateTime.Parse(eventStartDate).ToString("yyyy-MM-dd") +
                        " " +
                        eventStartHour +
                        ":" +
                        eventStartMinute + ":00 - " +
                        DateTime.Parse(eventEndDate).ToString("yyyy-MM-dd") +
                        " " + eventEndHour + ":" + eventEndMinute + ":00";
                    this.lblCountry.Text = eventCountry;
                    this.lblZipCity.Text = eventZipCode + "," + eventCountry;
                    this.lblStreetHouseNo.Text = eventStreet + " " + eventHouseNumber;
                    this.lblFullDay.Text = eventFullDay ? "Full Day" : "";
                    if(eventStartDate == DateTime.Now.ToString("dd MMMM yyyy"))
                    {
                        this.BackColor = Color.FromArgb(36, 31, 24);
                    }
                    else
                    {
                        this.BackColor = Color.FromArgb(50, 50, 50);
                    }
                    Trace.WriteLine("Startdate: " + startDate + " Event Start Date: " + eventStartDate);
                }
                
            }


        }
    }
}