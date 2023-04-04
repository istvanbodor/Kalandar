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
    public partial class UserEventsForm : Form
    {
        public static bool acceptedForm { get; set; }
        private string baseURL = APIConnectDetails.baseURL;
        private string token = CurrentUser.userToken;
        Point mouseLocation;
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

        private void pnlTop_MouseDown(object sender, MouseEventArgs e)
        {
            mouseLocation = new Point(-e.X, -e.Y);
        }

        private void pnlTop_MouseMove(object sender, MouseEventArgs e)
        {
            if (e.Button == MouseButtons.Left)
            {
                Point mousePose = Control.MousePosition;
                mousePose.Offset(mouseLocation.X, mouseLocation.Y);
                Location = mousePose;
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
                var now = DateTime.Now;
                acceptedForm = false;
                
                addEventForm.EndDateText = actualDate.ToString("dd MMMM yyyy");
                addEventForm.StartHourText = DateTime.Now.ToString("HH");
                addEventForm.StartMinuteText = DateTime.Now.ToString("mm");
                addEventForm.EndHourText = DateTime.Now.AddHours(1).ToString("HH");
                addEventForm.EndMinuteText = DateTime.Now.ToString("mm");
                addEventForm.DTPStartDate = new DateTime(actualDate.Year, actualDate.Month, actualDate.Day);
                addEventForm.StartDateText = addEventForm.DTPStartDate.ToString("yyyy-MM-dd");
                addEventForm.DTPEndDate = new DateTime(actualDate.Year, actualDate.Month, actualDate.Day, 0, 0, 0);
                addEventForm.EndDateText = addEventForm.DTPEndDate.ToString("yyyy-MM-dd");
                addEventForm.APIMethod = "Add";
                addEventForm.TitleText = "ADD EVENT";
                addEventForm.ShowDialog();
                
                    EventsBlank eventForm = new EventsBlank();
                    eventForm.DateText = addEventForm.StartDateText +
                        " " +
                        addEventForm.StartHourText +
                        ":" +
                        addEventForm.StartMinuteText +
                        ":00 - " +
                        addEventForm.EndDateText +
                        " " +
                        addEventForm.EndHourText +
                        ":" +
                        addEventForm.EndMinuteText +
                        ":00";
                    eventForm.CategoryText = addEventForm.EventCategoryText;
                    eventForm.AddressCountryText = addEventForm.CountryText;
                    eventForm.AddressStreetHouseNoText = addEventForm.StreetText + " " + addEventForm.HouseNumberText;
                    eventForm.AddressZipCityText = addEventForm.ZipText + ", " + addEventForm.CityText;
                    pnlEvents.Controls.Clear();


                    var nowStart = DateTime.Now;
                    var nowEnd = DateTime.Now;
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
                                Trace.WriteLine("Button date: " + actualDate + " startDate: " + startDate + " End Date: " + endDate + " End Now: " + nowEnd);
                                if (startDate <= actualDate && endDate >= actualDate)
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
                                    pnlEvents.Controls.Add(eventsUC);
                                }
                            }
                        }
                    }
            }
        }
    }
}
