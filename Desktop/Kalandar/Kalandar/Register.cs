﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO.Ports;
using System.Linq;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Policy;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json;

namespace Kalandar
{
    public partial class Register : Form
    {
        private string baseURL = APIConnectDetails.baseURL;
        Point mouseLocation;
        public Register()
        {
            InitializeComponent();
            lblError.Text = "";
        }

        private void btnExit_Click(object sender, EventArgs e)
        {
            System.Windows.Forms.Application.Exit();
        }

        private void btnLoginNow_Click(object sender, EventArgs e)
        {
            this.Hide();
            Login loginForm = new Login();
            loginForm.ShowDialog();
        }
        private void txtRegisterFirstName_Click(object sender, EventArgs e)
        {
            txtRegisterFirstName.SelectAll();
        }
        private void txtRegisterLastName_Click(object sender, EventArgs e)
        {
            txtRegisterLastName.SelectAll();

        }
        private void txtRegisterEmail_Click(object sender, EventArgs e)
        {
            txtRegisterEmail.SelectAll();
        }

        private void txtRegisterUsername_Click(object sender, EventArgs e)
        {
            txtRegisterUsername.SelectAll();
        }

        private void txtRegisterPassword_Click(object sender, EventArgs e)
        {
            txtRegisterPassword.SelectAll();
        }

        private void txtRegisterPasswordRepeat_Click(object sender, EventArgs e)
        {
            txtRegisterPasswordRepeat.SelectAll();
        }
        private void btnRegister_Click(object sender, EventArgs e)
        {

            bool validation = registerValidation(
                txtRegisterFirstName.Text,
                txtRegisterLastName.Text,
                txtRegisterUsername.Text,
                txtRegisterEmail.Text,
                txtRegisterPassword.Text,
                txtRegisterPasswordRepeat.Text
                );

            if (validation)
            { 
                using (var client = new HttpClient())
                {
                    try
                    {
                        var endpoint = new Uri(baseURL + "api/auth/register");
                        var newUser = new NewUser()
                        {
                            firstName = txtRegisterFirstName.Text,
                            lastName = txtRegisterLastName.Text,
                            username = txtRegisterUsername.Text,
                            email = txtRegisterEmail.Text,
                            password = txtRegisterPassword.Text,
                            role = "USER"
                        };
                        var newPostJson = JsonConvert.SerializeObject(newUser);
                        var payload = new StringContent(newPostJson, Encoding.UTF8, "application/json");
                        var result = client.PostAsync(endpoint, payload).Result;
                        result.EnsureSuccessStatusCode();
                        Trace.WriteLine((int)result.StatusCode);
                        if (result.IsSuccessStatusCode)
                        {
                            lblError.ForeColor = Color.Green;
                            lblError.Text = "Account has been created!";
                            Trace.Write("Account has been created.");
                        }
                        
                    }
                    catch (HttpRequestException error)
                    {
                        lblError.ForeColor = Color.LightCoral;
                        lblError.Text = "User with this email already exists!";
                        Trace.Write(error.Message);
                    };
                }
            }

        }

        private bool registerValidation(string fName, string lName, string uName, string email, string password, string rPassword)
        {
            
            if (fName == "")
            {
                lblError.ForeColor = Color.LightCoral;
                lblError.Text = "First name can not be blank!";
                return false;
            }
            else if (lName == "")
            {
                lblError.ForeColor = Color.LightCoral;
                lblError.Text = "Last name can not be blank!";
                return false;
            }
            else if (email == "")
            {
                lblError.ForeColor = Color.LightCoral;
                lblError.Text = "Email can not be blank!";
                return false;
            }
            else if (uName == "")
            {
                lblError.ForeColor = Color.LightCoral;
                lblError.Text = "Username can not be blank!";
                return false;
            }
            else if (password == "")
            {
                lblError.ForeColor = Color.LightCoral;
                lblError.Text = "Password name can not be blank!";
                return false;
            }
            else if (password != rPassword)
            {
                lblError.ForeColor = Color.LightCoral;
                lblError.Text = "Passwords does not match!";
                return false;
            }
            else
            {
                if (!IsValidEmail(email))
                {
                    lblError.ForeColor = Color.LightCoral;
                    lblError.Text = "Email is invalid!";
                    return false;
                }
                else
                {
                    return true;
                }

            }
        }
        public bool IsValidEmail(string email)
        {
            Regex emailRegex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$", RegexOptions.IgnoreCase);

            return emailRegex.IsMatch(email);
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
    }
}
