using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Kalandar
{
    public partial class Register : Form
    {
        public Register()
        {
            InitializeComponent();
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
            //using(var client = new HttpClient())
            //{
            //    var endpoint = new Url("https://retoolapi.dev/uf57Fk/data");
            //    var newUser = new NewUser()
            //    {
            //        Name = "Roland",
            //        Email = "asd@asd.com",
            //        Password = "asd123"
            //    };
            
            //}
        }
    }
}
