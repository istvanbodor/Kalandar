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

                    //foreach(var item in json2)
                    //{
                    //    Trace.WriteLine("json2 " + item.token);
                    //}
                    
                    //result.EnsureSuccessStatusCode();
                    //lblError.ForeColor = Color.Green;
                    //lblError.Text = "Account has been created!";

                    //List<string> token = JsonConvert.DeserializeObject <List<string>>(result);

                    //if (token != null)
                    //{
                    //    foreach (var data in token)
                    //    {
                    //        Trace.WriteLine(token);
                    //    }
                    //}
 
                    Trace.WriteLine("Bearer " + token);
                    CurrentUser.userToken = token;
                    Trace.WriteLine("LoginToken = " + CurrentUser.userToken);
                    this.Hide();
                    Form applicationForm = new Kalandar();
                    applicationForm.ShowDialog();

                }
                catch (HttpRequestException error)
                {
                    //lblError.ForeColor = Color.LightCoral;
                    //lblError.Text = "User with this email already exists!";
                    lblLoginText.Text = error.Message;
                    
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
