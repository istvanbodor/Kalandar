using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml.Linq;

namespace Kalandar
{
    public partial class Kalandar : Form
    {
        private DateClass selectedDate = new DateClass();
        private string baseURL = APIConnectDetails.baseURL;

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

        private string token = CurrentUser.userToken;

        public Kalandar()
        {
            InitializeComponent();
            checkUserRole();
            generateCalendar();
            editDateText();
        }

        private void checkUserRole()
        {
            if (UserData.role != "ADMIN")
            {
                btnUsers.Visible = false;
            }
            else
            {
                btnUsers.Visible = true;
            }
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
        }

        private void editDateText()
        {
            DateTime date = new DateTime(selectedDate.Year, selectedDate.Month, 1);
            lblTopBar.Text = String.Format("{0}", date.ToString("MMMM, yyyy"));
        }

        private void generateEvents()
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
                var endpoint = new Uri(baseURL + "api/events/user/" + UserData.id);
                var result = client.GetAsync(endpoint).Result;
                var json = result.Content.ReadAsStringAsync().Result;

                List<EventClass> events = JsonConvert.DeserializeObject<List<EventClass>>(json);
                Trace.WriteLine(json);
                if (events != null)
                {
                    foreach (var data in events)
                    {
                        EventsBlank eventsUC = new EventsBlank();
                        eventsUC.TitleText = data.@event;
                        eventsUC.DateText = data.startTime + " - " + data.endTime;
                        eventsUC.IsFullDayText = Convert.ToString(data.fullDay);
                        eventsUC.OrganisedByText = "Organised by: " + data.username;
                        eventsUC.CategoryText = data.category;
                        eventsUC.AddressCountryText = data.address.country;
                        eventsUC.AddressStreetHouseNoText = data.address.street + " " + data.address.houseNumber;
                        eventsUC.AddressZipCityText = data.address.zip + ", " + data.address.city;

                        pnlCalendar.Controls.Add(eventsUC);
                    }
                }
            }
        }

        private void generateUsers()
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
                var endpoint = new Uri(baseURL + "api/admin/users");
                var result = client.GetAsync(endpoint).Result;
                var json = result.Content.ReadAsStringAsync().Result;

                List<NewUser> users = JsonConvert.DeserializeObject<List<NewUser>>(json);
                Trace.WriteLine(users);
                if (users != null)
                {
                    foreach (var data in users)
                    {
                        UsersUserControl usersUC = new UsersUserControl();
                        usersUC.IdText = Convert.ToString(data.id);
                        usersUC.EmailText = data.email;
                        usersUC.FirstNameText = data.firstName;
                        usersUC.LastNameText = data.lastName;
                        usersUC.UsernameText = data.username;
                        usersUC.RoleText = data.role;
                        pnlCalendar.Controls.Add(usersUC);
                    }
                }
            }
        }

        private void generateUserProfile()
        {

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
                var endpoint = new Uri(baseURL + "api/user/profile");
                var result = client.GetAsync(endpoint).Result;
                var json = result.Content.ReadAsStringAsync().Result;
                CurrentUser user = JsonConvert.DeserializeObject<CurrentUser>(json);
                Trace.WriteLine(user.username);
                UserData.id = user.id;
                UserData.email = user.email;
                UserData.firstName = user.firstName;
                UserData.lastName = user.lastName;
                UserData.username = user.username;
                UserData.role = user.role;
                Trace.Write(token);
            }

            ProfileUserControl profileUC = new ProfileUserControl();
            profileUC.firstNameText = UserData.firstName;
            profileUC.lastNameText = UserData.lastName;
            profileUC.usernameText = UserData.username;
            profileUC.emailText = UserData.email;
            pnlCalendar.Controls.Add(profileUC);

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

        private void btnEvents_Click(object sender, EventArgs e)
        {
            btnCalendar.BackColor = Color.FromArgb(60, 60, 60);
            btnEvents.BackColor = Color.FromArgb(181, 130, 64);
            btnProfile.BackColor = Color.FromArgb(60, 60, 60);
            btnUsers.BackColor = Color.FromArgb(60, 60, 60);
            pnlCalendar.Controls.Clear();
            pctrNextMonth.Visible = false;
            pctrPrevMonth.Visible = false;
            generateEvents();
            lblTopBar.Text = "Events";
            pnlHeader.Visible = false;


        }
        
        private void btnKalendar_Click(object sender, EventArgs e)
        {
            btnCalendar.BackColor = Color.FromArgb(181, 130, 64);
            btnEvents.BackColor = Color.FromArgb(60, 60, 60);
            btnProfile.BackColor = Color.FromArgb(60, 60, 60);
            btnUsers.BackColor = Color.FromArgb(60, 60, 60);
            pnlCalendar.Controls.Clear();
            pctrNextMonth.Visible = true;
            pctrPrevMonth.Visible = true;
            generateCalendar();
            pnlWeekdays.Visible = true;
            editDateText();
            pnlHeader.Visible = true;

        }

        private void btnUsers_Click(object sender, EventArgs e)
        {

            lblTopBar.Text = "Users";
            pnlWeekdays.Visible = false;
            pnlHeader.Visible = true;
            btnCalendar.BackColor = Color.FromArgb(60, 60, 60);
            btnEvents.BackColor = Color.FromArgb(60, 60, 60);
            btnProfile.BackColor = Color.FromArgb(60, 60, 60);
            btnUsers.BackColor = Color.FromArgb(181, 130, 64);
            pnlCalendar.Controls.Clear();
            pctrNextMonth.Visible = false;
            pctrPrevMonth.Visible = false;
            generateUsers();
            
            
        }

        private void btnLogout_Click(object sender, EventArgs e)
        {
            this.Hide();
            Login loginForm = new Login();
            loginForm.ShowDialog();
        }

        private void btnProfile_Click(object sender, EventArgs e)
        {
            lblTopBar.Text = "Profile";
            pnlHeader.Visible = false;
            btnCalendar.BackColor = Color.FromArgb(60, 60, 60);
            btnEvents.BackColor = Color.FromArgb(60, 60, 60);
            btnUsers.BackColor = Color.FromArgb(60, 60, 60);
            btnProfile.BackColor = Color.FromArgb(181, 130, 64);
            pnlCalendar.Controls.Clear();
            pctrNextMonth.Visible = false;
            pctrPrevMonth.Visible = false;
            generateUserProfile();
        }

        private void btnAddEvent_Click(object sender, EventArgs e)
        {
            AddEventForm addEventForm = new AddEventForm();
            addEventForm.StartDateText = DateTime.Now.ToString("dd MMMM yyyy");
            addEventForm.EndDateText = DateTime.Now.ToString("dd MMMM yyyy");
            addEventForm.StartHourText = DateTime.Now.ToString("HH");
            addEventForm.StartMinuteText = DateTime.Now.ToString("mm");
            addEventForm.EndHourText = DateTime.Now.AddHours(1).ToString("HH");
            addEventForm.EndMinuteText = DateTime.Now.ToString("mm");
            addEventForm.Show();
        }
    }
}
