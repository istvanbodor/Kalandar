using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
    
    public partial class Login : Form
    {
        public Login()
        {
            InitializeComponent();

        }
        private void btnRegister_Click(object sender, EventArgs e)
        {
            this.Hide();
            Form registerForm = new Register();
            registerForm.ShowDialog();
        }

        private void btnExit_Click(object sender, EventArgs e)
        {
            System.Windows.Forms.Application.Exit();
        }

        private void btnLogin_Click(object sender, EventArgs e)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    var endpoint = new Uri("http://localhost:8080/api/auth/login");
                    var loginUser = new NewUser()
                    {
                        email = txtLoginEmail.Text,
                        password = txtLoginPassword.Text
                    };
                    var newPostJson = JsonConvert.SerializeObject(loginUser);
                    var payload = new StringContent(newPostJson, Encoding.UTF8, "application/json");
                    var result = client.PostAsync(endpoint, payload).Result.Content.ReadAsStringAsync().Result;
                    var json = result;
                    var token = JsonConvert.DeserializeObject<CurrentUser>(json).token;
                    
                    CurrentUser.userToken = token;
                    

                }
                catch (HttpRequestException error)
                {
                    lblLoginText.Text = error.Message;
                    
                    Trace.Write(error.Message);
                }
                
                try
                {
                    string token = CurrentUser.userToken;

                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
                    var endpoint = new Uri("http://localhost:8080/api/user/profile");
                    var result = client.GetAsync(endpoint).Result;
                    var json = result.Content.ReadAsStringAsync().Result;
                    CurrentUser user = JsonConvert.DeserializeObject<CurrentUser>(json);

                    UserData.id = user.id;
                    UserData.email = user.email;
                    UserData.firstName = user.firstName;
                    UserData.lastName = user.lastName;
                    UserData.username = user.username;
                    UserData.role = user.role;
                    
                    if (token != null)
                    {
                        this.Hide();
                        Form applicationForm = new Kalandar();
                        applicationForm.ShowDialog();
                    }
                    else
                    {
                        Trace.Write("Error");
                    }
                    
                }
                catch (HttpRequestException error)
                {
                    Trace.Write(error.Message);
                }

                
            }
        }

        private void txtLoginUsername_Click(object sender, EventArgs e)
        {
            txtLoginEmail.SelectAll();
        }

        private void txtLoginPassword_Click(object sender, EventArgs e)
        {
            txtLoginPassword.SelectAll();
        }
    }
}
