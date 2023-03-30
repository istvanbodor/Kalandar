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



        public string EventCategoryText
        {
            get
            {
                return this.txtCategory.Text;
            }
            set
            {
                this.txtCategory.Text = value;
            }
        }

        public DateTime DTPStartDate
        {
            get
            {
                return this.dtpStartDate.Value;
            }
            set
            {
                if(value >= dtpStartDate.MinDate)
                {
                    this.dtpStartDate.Value = value;
                }
                else
                {
                    string message = "Simple MessageBox";
                    MessageBox.Show(message);
                }
                
            }
        }

        public string StartHourText
        {
            get
            {
                return this.nmrcStartHour.Text;
            }
            set
            {
                this.nmrcStartHour.Text = value;
            }
        }

        public string StartMinuteText
        {
            get
            {
                return this.nmrcStartMinute.Text;
            }
            set
            {
                this.nmrcStartMinute.Text = value;
            }
        }
        public string EndHourText
        {
            get
            {
                return this.nmrcEndHour.Text;
            }
            set
            {
                this.nmrcEndHour.Text = value;
            }
        }
        public string EndMinuteText
        {
            get
            {
                return this.nmrcEndMinute.Text;
            }
            set
            {
                this.nmrcEndMinute.Text = value;
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
            using (var client = new HttpClient())
            {
                Trace.WriteLine("End date: " + dtpEndDate.Text);
                try
                {
                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
                    var endpoint = new Uri(baseURL + "api/events");
                    Trace.WriteLine(dtpEndDate.Value.ToString($"yyyy-MM-ddT{nmrcStartHour.Value}:{nmrcStartMinute.Value}:00"));
                    var newEvent = new EventClass()
                    {
                        @event = txtEventTitle.Text,
                        startTime = dtpStartDate.Value.ToString($"yyyy-MM-ddT{nmrcStartHour.Value}:{nmrcStartMinute.Value}:00"),
                        endTime = dtpEndDate.Value.ToString($"yyyy-MM-ddT{nmrcEndHour.Value}:{nmrcEndMinute.Value}:00"),
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

        private void dtpStartDate_ValueChanged(object sender, EventArgs e)
        {
            txtStartDate.Text = dtpStartDate.Text;
        }
        private void dtpEndDate_ValueChanged(object sender, EventArgs e)
        {
            if (dtpEndDate.Value > dtpStartDate.Value)
            {
                txtEndDate.Text = dtpEndDate.Text;
            }
            else
            {
                string message = "Simple MessageBox";
                MessageBox.Show(message);
            }

        }

        private void nmrcStartHour_ValueChanged(object sender, EventArgs e)
        {
            txtStartHourText.Text = nmrcStartHour.Value.ToString();
        }
        private void nmrcStartMinute_ValueChanged(object sender, EventArgs e)
        {
            txtStartMinuteText.Text = nmrcStartMinute.Value.ToString();
        }
        private void nmrcEndHour_ValueChanged(object sender, EventArgs e)
        {
            txtEndHourText.Text = nmrcEndHour.Value.ToString();
        }
        private void nmrcEndMinute_ValueChanged(object sender, EventArgs e)
        {
            txtEndMinuteText.Text = nmrcEndMinute.Value.ToString();
        }

        private void txtCountry_Click(object sender, EventArgs e)
        {
            this.txtCountry.SelectAll();
        }

        private void txtStreet_Click(object sender, EventArgs e)
        {
            this.txtStreet.SelectAll();
        }

        private void txtZipCode_Click(object sender, EventArgs e)
        {
            this.txtZipCode.SelectAll();
        }

        private void txtCity_Click(object sender, EventArgs e)
        {
            this.txtCity.SelectAll();
        }

        private void txtHouseNumber_Click(object sender, EventArgs e)
        {
            this.txtHouseNumber.SelectAll();
        }

        private void txtCategory_Click(object sender, EventArgs e)
        {
            this.txtCategory.SelectAll();
        }

        private void txtEventTitle_Click(object sender, EventArgs e)
        {
            this.txtEventTitle.SelectAll();
        }
    }
}