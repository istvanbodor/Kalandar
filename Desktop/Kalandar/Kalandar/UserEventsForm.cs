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
    public partial class UserEventsForm : Form
    {
        private DateClass selectedDate = new DateClass();
        public UserEventsForm()
        {
            InitializeComponent();
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
        
    }
}
