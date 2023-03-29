using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Kalandar
{
    public partial class AddEventForm : Form
    {

        private string baseURL = APIConnectDetails.baseURL;
        private string token = CurrentUser.userToken;
        private string id = UserData.id.ToString();
        public AddEventForm()
        {
            InitializeComponent();
        }
        public string EventTitleText
        {
            get
            {
                return this.txtEventTitle.Text;
            }
            set
            {
                this.txtEventTitle.Text = value;
            }
        }

        public string StartDateText
        {
            get
            {
                return this.txtStartDate.Text;
            }
            set
            {
                this.txtStartDate.Text = value;
            }
        }

        public string EndDateText
        {
            get
            {
                return this.txtEndDate.Text;
            }
            set
            {
                this.txtEndDate.Text = value;
            }
        }

        public string CountryText
        {
            get
            {
                return this.txtCountry.Text;
            }
            set
            {
                this.txtCountry.Text = value;
            }
        }

        public string ZipText
        {
            get
            {
                return this.txtZipCode.Text;
            }
            set
            {
                this.txtZipCode.Text = value;
            }
        }
        public string StreetText
        {
            get
            {
                return this.txtStreet.Text;
            }
            set
            {
                this.txtStreet.Text = value;
            }
        }
        public string CityText
        {
            get
            {
                return this.txtCity.Text;
            }
            set
            {
                this.txtCity.Text = value;
            }
        }
        public string HouseNumberText
        {
            get
            {
                return this.txtHouseNumber.Text;
            }
            set
            {
                this.txtHouseNumber.Text = value;
            }
        }

        

        //public string EventCategoryText
        //{
        //    get
        //    {
        //        return this.txtCategory.Text;
        //    }
        //    set
        //    {
        //        this.txtCategory.Text = value;
        //    }
        //}

        private void btnExit_Click(object sender, EventArgs e)
        {
            this.Close();
            
        }

        private void btnAddEvent_Click(object sender, EventArgs e)
        {
            using (var client = new HttpClient())
            {
                dtpStartDate.Format = DateTimePickerFormat.Custom;
                dtpStartDate.CustomFormat = "yyyy-MM-ddTHH:mm:ss";
                dtpEndDate.Format = DateTimePickerFormat.Custom;
                dtpEndDate.CustomFormat = "yyyy-MM-ddTHH:mm:ss";
                Trace.WriteLine("End date: " + dtpEndDate.Text);
                try
                {
                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
                    var endpoint = new Uri(baseURL + "api/events");
                    var newEvent = new EventClass()
                    {
                        @event = txtEventTitle.Text,
                        startTime = dtpStartDate.Text,
                        endTime = dtpEndDate.Text,
                        fullDay = chckFullDay.Checked,
                        category = txtCategory.Text,
                        address = new AddressClass
                        {
                            city = txtCity.Text,
                            zip = txtZipCode.Text,
                            country = txtCountry.Text,
                            street = txtStreet.Text,
                            houseNumber = txtHouseNumber.Text,
                        },
                        user = new CurrentUser
                        {
                            id = UserData.id
                        }

                    };
                    var newPostJson = JsonConvert.SerializeObject(newEvent);
                    var payload = new StringContent(newPostJson, UTF8Encoding.UTF8, "application/json");
                    var result = client.PostAsync(endpoint, payload).Result;
                    result.EnsureSuccessStatusCode();
                    Trace.WriteLine((int)result.StatusCode);
                    if (result.IsSuccessStatusCode)
                    {
                        //lblError.ForeColor = Color.Green;
                        //lblError.Text = "Account has been created!";
                        //Trace.Write("Account has been created.");
                        Trace.WriteLine("Felvettem");
                    }

                }
                catch (HttpRequestException error)
                {
                    //lblError.ForeColor = Color.LightCoral;
                    //lblError.Text = "User with this email already exists!";
                    Trace.Write(error.Message);
                };
            }
        }
    }
}
