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
    public partial class EventsBlank : UserControl
    {
        public EventsBlank()
        {
            InitializeComponent();
        }

        public string TitleText
        {
            get
            {
                return this.lblTitle.Text;
            }
            set
            {
                this.lblTitle.Text = value;
            }
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
        public string CategoryText
        {
            get
            {
                return this.lblCategory.Text;
            }
            set
            {
                this.lblCategory.Text = value;
            }
        }
        public string IsFullDayText
        {
            get
            {
                return this.lblFullDay.Text;
            }
            set
            {
                this.lblFullDay.Text = value;
            }
        }
        public string OrganisedByText
        {
            get
            {
                return this.lblOrganisedBy.Text;
            }
            set
            {
                this.lblOrganisedBy.Text = value;
            }
        }
        public string AddressZipCityText
        {
            get
            {
                return this.lblZipCity.Text;
            }
            set
            {
                this.lblZipCity.Text = value;
            }
        }
        public string AddressCountryText
        {
            get
            {
                return this.lblCountry.Text;
            }
            set
            {
                this.lblCountry.Text = value;
            }
        }
        public string AddressStreetHouseNoText
        {
            get
            {
                return this.lblStreesHouseNo.Text;
            }
            set
            {
                this.lblStreesHouseNo.Text = value;
            }
        }
    }
}
