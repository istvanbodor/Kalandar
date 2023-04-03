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
    }
}