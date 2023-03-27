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
    public partial class ProfileUserControl : UserControl
    {
        public ProfileUserControl()
        {
            InitializeComponent();
        }

        public string usernameText
        {
            get
            {
                return this.lblUsername.Text;
            }
            set
            {
                this.lblUsername.Text = value;
                this.lblUsername2.Text = value;
            }
        }

        public string emailText
        {
            get
            {
                return this.lblEmail.Text;
            }
            set
            {
                this.lblEmail.Text = value;
            }
        }

        public string firstNameText
        {
            get
            {
                return this.lblFirstName.Text;
            }
            set
            {
                this.lblFirstName.Text = value;
            }
        }
        public string lastNameText
        {
            get
            {
                return this.lblLastName.Text;
            }
            set
            {
                this.lblLastName.Text = value;
            }
        }

        private void btnChangePassword_Click(object sender, EventArgs e)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", CurrentUser.userToken);
                    var endpoint = new Uri("http://localhost:8080/api/user/password");
                    NewUser user = new NewUser
                    {
                        password = "buba"
                    };

                    var editUserJson = JsonConvert.SerializeObject(user, Formatting.Indented);
                    var payload = new StringContent(editUserJson, Encoding.UTF8, "application/json");
                    var response = client.PutAsync(endpoint, payload).Result;
                    response.EnsureSuccessStatusCode();
                    Trace.WriteLine("poggies");
                }
                catch (HttpRequestException error)
                {
                    Trace.Write(error.Message);
                }
            }
        }
    }
}
