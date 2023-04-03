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
                return this.lblStreesHouseNo.Text;
            }
            set
            {
                this.lblStreesHouseNo.Text = value;
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

        //private void refreshForm()
        //{
        //    pnlEvents.Controls.Clear();

        //    var eventCounter = 0;
        //    var nowStart = DateTime.Now;
        //    var nowEnd = DateTime.Now;

        //    using (var client = new HttpClient())
        //    {
        //        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        //        var endpoint = new Uri(baseURL + "api/events/user/" + UserData.id);
        //        var result = client.GetAsync(endpoint).Result;
        //        var json = result.Content.ReadAsStringAsync().Result;

        //        List<EventClass> events = JsonConvert.DeserializeObject<List<EventClass>>(json);
        //        var orderedList = events.OrderBy(x => x.startTime).ToList();
        //        Trace.WriteLine(json);
        //        if (orderedList != null)
        //        {
        //            foreach (var data in orderedList)
        //            {
        //                nowStart = new DateTime(nowStart.Year, nowStart.Month, nowStart.Day);
        //                nowEnd = new DateTime(nowEnd.Year, nowEnd.Month, nowEnd.Day, 23, 59, 59);

        //                string[] eventStartDate = data.startTime.Replace("T", "-").Split('-');
        //                int eventStartYear = Convert.ToInt32(eventStartDate[0]);
        //                int eventStartMonth = Convert.ToInt32(eventStartDate[1]);
        //                int eventStartDay = Convert.ToInt32(eventStartDate[2]);

        //                string[] eventEndDate = data.endTime.Replace("T", "-").Split('-');
        //                int eventEndYear = Convert.ToInt32(eventEndDate[0]);
        //                int eventEndMonth = Convert.ToInt32(eventEndDate[1]);
        //                int eventEndDay = Convert.ToInt32(eventEndDate[2]);

        //                DateTime startDate = new DateTime(eventStartYear, eventStartMonth, eventStartDay);
        //                DateTime endDate = new DateTime(eventEndYear, eventEndMonth, eventEndDay);
        //                Trace.WriteLine("Button date: " + actualDate + " startDate: " + startDate + " End Date: " + endDate + " End Now: " + nowEnd);
        //                if (startDate <= actualDate && endDate >= actualDate)
        //                {
        //                    eventCounter++;
        //                    EventsBlank eventsUC = new EventsBlank();
        //                    eventsUC.TitleText = data.@event;
        //                    eventsUC.DateText = data.startTime.Replace('T', ' ') + " - " + data.endTime.Replace('T', ' ');
        //                    eventsUC.IsFullDayText = data.fullDay ? "Full-day event" : "";
        //                    eventsUC.CategoryText = data.category;
        //                    eventsUC.LabelIdText = data.id;
        //                    eventsUC.AddressCountryText = data.address.country;
        //                    eventsUC.AddressStreetHouseNoText = data.address.street + " " + data.address.houseNumber;
        //                    eventsUC.AddressZipCityText = data.address.zip + ", " + data.address.city;
        //                    Trace.WriteLine("Spli-tes cucc: " + data.startTime.Split('T')[0]);
        //                    pnlEvents.Controls.Add(eventsUC);


        //                }
        //            }
        //        }
        //    }
        //}

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
                addEventForm.TitleText = "MODIFY EVENT";
                addEventForm.ShowDialog();
                if (acceptedForm && startDate == DateTime.Parse(eventStartDate))
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
                    this.lblStreesHouseNo.Text = eventStreet + " " + eventHouseNumber;
                    this.lblFullDay.Text = eventFullDay ? "Full Day" : "";
                }
                else if(acceptedForm)
                {
                    
                    this.Hide();
                }
                
            }


        }
    }
}