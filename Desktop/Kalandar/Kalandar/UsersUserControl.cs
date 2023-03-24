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
        public UsersUserControl()
        {
            InitializeComponent();
        }

        private string token = TokenClass.userToken;
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

        public string NameText
        {
            get
            {
                return this.lblName.Text;
            }
            set
            {
                this.lblName.Text = value;
            }
        }

        public string PasswordText
        {
            get
            {
                return this.lblPassword.Text;
            }
            set
            {
                this.lblPassword.Text = value;
            }
        }

        private void btnDeleteUser_Click(object sender, EventArgs e)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
                    var endpoint = new Uri("http://localhost:8080/api/admin/user");
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
    }
}
