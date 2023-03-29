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
    public partial class UsersUserControl : UserControl
    {
        private string baseURL = APIConnectDetails.baseURL;
        public UsersUserControl()
        {
            InitializeComponent();
        }

        private string token = CurrentUser.userToken;
        public string IdText
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

        public string EmailText
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

        public string UsernameText
        {
            get
            {
                return this.lblUsername.Text;
            }
            set
            {
                this.lblUsername.Text = value;
            }
        }

        public string FirstNameText
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

        public string LastNameText
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

        public string RoleText
        {
            get
            {
                return this.lblRole.Text;
            }
            set
            {
                this.lblRole.Text = value;
            }
        }

        private void btnDeleteUser_Click(object sender, EventArgs e)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
                    var endpoint = new Uri(baseURL + "api/admin/user");
                    var response = client.DeleteAsync(endpoint + $"/{this.lblId.Text}").Result;
                    Trace.WriteLine("userID = " + this.lblId.Text);
                    response.EnsureSuccessStatusCode();
                    this.Hide();
                }
                catch(HttpRequestException error)
                {
                    Trace.Write(error.Message);
                }
            }
        }

        private void btnGiveRights_Click(object sender, EventArgs e)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
                    var endpoint = new Uri(baseURL + "api/admin/role/user/");
                    var response = client.PutAsJsonAsync(endpoint + $"{this.lblId.Text}", "").Result;
                    Trace.WriteLine("userIDAdminRights = " + this.lblId.Text);
                    response.EnsureSuccessStatusCode();
                    if (response.IsSuccessStatusCode)
                    {
                        if (this.lblRole.Text == "USER")
                        {
                            this.lblRole.Text = "ADMIN";
                        }
                        else
                        {
                            this.lblRole.Text = "USER";
                        }
                        
                    }
                }
                catch (HttpRequestException error)
                {
                    Trace.Write(error.Message);
                }
            }
        }
    }
}
