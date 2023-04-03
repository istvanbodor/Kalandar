using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
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
    public partial class CalendarDayNumberUserControl : UserControl
    {
        private DateTime buttonDate;
        private string baseURL = APIConnectDetails.baseURL;
        private string token = CurrentUser.userToken;

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
            Trace.WriteLine("Buttondate: " + buttonDate + "Type: " + buttonDate.GetType());
            var nowStart = DateTime.Now;
            var nowEnd = DateTime.Now;
            UserEventsForm eventForm = new UserEventsForm();
            eventForm.DateText = buttonDate.ToString("dd MMMM yyyy");
            eventForm.ActualDate = buttonDate;

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
                var endpoint = new Uri(baseURL + "api/events/user/" + UserData.id);
                var result = client.GetAsync(endpoint).Result;
                var json = result.Content.ReadAsStringAsync().Result;

                List<EventClass> events = JsonConvert.DeserializeObject<List<EventClass>>(json);
                var orderedList = events.OrderBy(x => x.startTime).ToList();
                Trace.WriteLine(json);
                if (orderedList != null)
                {
                    foreach (var data in orderedList)
                    {
                        nowStart = new DateTime(nowStart.Year, nowStart.Month, nowStart.Day);
                        nowEnd = new DateTime(nowEnd.Year, nowEnd.Month, nowEnd.Day, 23, 59, 59);

                        string[] eventStartDate = data.startTime.Replace("T", "-").Split('-');
                        int eventStartYear = Convert.ToInt32(eventStartDate[0]);
                        int eventStartMonth = Convert.ToInt32(eventStartDate[1]);
                        int eventStartDay = Convert.ToInt32(eventStartDate[2]);

                        string[] eventEndDate = data.endTime.Replace("T", "-").Split('-');
                        int eventEndYear = Convert.ToInt32(eventEndDate[0]);
                        int eventEndMonth = Convert.ToInt32(eventEndDate[1]);
                        int eventEndDay = Convert.ToInt32(eventEndDate[2]);

                        DateTime startDate = new DateTime(eventStartYear, eventStartMonth, eventStartDay);
                        DateTime endDate = new DateTime(eventEndYear, eventEndMonth, eventEndDay);
                        Trace.WriteLine("Button date: " + buttonDate + " startDate: " + startDate + " End Date: " + endDate + " End Now: " + nowEnd);
                        if (startDate <= buttonDate && endDate >= buttonDate)
                        {
                            EventsBlank eventsUC = new EventsBlank();
                            eventsUC.TitleText = data.@event;
                            eventsUC.DateText = data.startTime.Replace('T', ' ') + " - " + data.endTime.Replace('T', ' ');
                            eventsUC.IsFullDayText = data.fullDay ? "Full-day event" : "";
                            eventsUC.CategoryText = data.category;
                            eventsUC.LabelIdText = data.id;
                            eventsUC.AddressCountryText = data.address.country;
                            eventsUC.AddressStreetHouseNoText = data.address.street + " " + data.address.houseNumber;
                            eventsUC.AddressZipCityText = data.address.zip + ", " + data.address.city;
                            Trace.WriteLine("Spli-tes cucc: " + data.startTime.Split('T')[0]);
                            eventForm.pnlEvents.Controls.Add(eventsUC);

                            
                        }
                    }
                }
            }
            eventForm.Show();


        }
    }
}