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
        DateTime currentTime;
        int year;
        int month;
        int day;

        public UserEventsForm()
        {
            InitializeComponent();
            
            currentTime = DateTime.Now;
            year = currentTime.Year;
            month = currentTime.Month;
            day = currentTime.Day;
            editDateText();

        }

        private void editDateText()
        {
            DateTime date = new DateTime(year, month, day);
            lblDate.Text = String.Format("{0}. {1}.", year, date.ToString("yyyy/MMMM/dd", new System.Globalization.CultureInfo("hu-HU")));
        }
        private void btnExit_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
