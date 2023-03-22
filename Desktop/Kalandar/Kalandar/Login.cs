using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
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
            this.Hide();
            Form applicationForm = new Kalandar();
            applicationForm.ShowDialog();
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
