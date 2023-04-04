namespace Kalandar
{
    partial class EventsBlank
    {
        /// <summary> 
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(EventsBlank));
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.lblTitle = new System.Windows.Forms.Label();
            this.btnModify = new System.Windows.Forms.Button();
            this.lblDate = new System.Windows.Forms.Label();
            this.lblCategory = new System.Windows.Forms.Label();
            this.lblFullDay = new System.Windows.Forms.Label();
            this.lblZipCity = new System.Windows.Forms.Label();
            this.lblCountry = new System.Windows.Forms.Label();
            this.lblStreetHouseNo = new System.Windows.Forms.Label();
            this.btnRemove = new System.Windows.Forms.Button();
            this.lblId = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = ((System.Drawing.Image)(resources.GetObject("pictureBox1.Image")));
            this.pictureBox1.Location = new System.Drawing.Point(9, 3);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(147, 147);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.pictureBox1.TabIndex = 0;
            this.pictureBox1.TabStop = false;
            // 
            // lblTitle
            // 
            this.lblTitle.AutoSize = true;
            this.lblTitle.Font = new System.Drawing.Font("Microsoft Sans Serif", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(181)))), ((int)(((byte)(130)))), ((int)(((byte)(64)))));
            this.lblTitle.Location = new System.Drawing.Point(170, 14);
            this.lblTitle.Name = "lblTitle";
            this.lblTitle.Size = new System.Drawing.Size(66, 24);
            this.lblTitle.TabIndex = 1;
            this.lblTitle.Text = "TITLE";
            // 
            // btnModify
            // 
            this.btnModify.FlatAppearance.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(181)))), ((int)(((byte)(130)))), ((int)(((byte)(64)))));
            this.btnModify.FlatAppearance.BorderSize = 2;
            this.btnModify.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(181)))), ((int)(((byte)(130)))), ((int)(((byte)(64)))));
            this.btnModify.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(181)))), ((int)(((byte)(130)))), ((int)(((byte)(64)))));
            this.btnModify.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnModify.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnModify.ForeColor = System.Drawing.SystemColors.ButtonHighlight;
            this.btnModify.Location = new System.Drawing.Point(708, 8);
            this.btnModify.Name = "btnModify";
            this.btnModify.Size = new System.Drawing.Size(143, 28);
            this.btnModify.TabIndex = 3;
            this.btnModify.Text = "MODIFY";
            this.btnModify.UseVisualStyleBackColor = true;
            this.btnModify.Click += new System.EventHandler(this.btnModify_Click);
            // 
            // lblDate
            // 
            this.lblDate.AutoSize = true;
            this.lblDate.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblDate.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(181)))), ((int)(((byte)(130)))), ((int)(((byte)(64)))));
            this.lblDate.Location = new System.Drawing.Point(170, 57);
            this.lblDate.Name = "lblDate";
            this.lblDate.Size = new System.Drawing.Size(270, 20);
            this.lblDate.TabIndex = 4;
            this.lblDate.Text = "2023/03/20 17:00 - 2023/03/21 18:00";
            // 
            // lblCategory
            // 
            this.lblCategory.AutoSize = true;
            this.lblCategory.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblCategory.ForeColor = System.Drawing.Color.White;
            this.lblCategory.Location = new System.Drawing.Point(170, 37);
            this.lblCategory.Name = "lblCategory";
            this.lblCategory.Size = new System.Drawing.Size(78, 20);
            this.lblCategory.TabIndex = 5;
            this.lblCategory.Text = "Groceries";
            // 
            // lblFullDay
            // 
            this.lblFullDay.AutoSize = true;
            this.lblFullDay.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblFullDay.ForeColor = System.Drawing.Color.White;
            this.lblFullDay.Location = new System.Drawing.Point(170, 77);
            this.lblFullDay.Name = "lblFullDay";
            this.lblFullDay.Size = new System.Drawing.Size(106, 20);
            this.lblFullDay.TabIndex = 6;
            this.lblFullDay.Text = "Full day event";
            // 
            // lblZipCity
            // 
            this.lblZipCity.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblZipCity.ForeColor = System.Drawing.Color.White;
            this.lblZipCity.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.lblZipCity.Location = new System.Drawing.Point(537, 81);
            this.lblZipCity.Name = "lblZipCity";
            this.lblZipCity.RightToLeft = System.Windows.Forms.RightToLeft.No;
            this.lblZipCity.Size = new System.Drawing.Size(314, 20);
            this.lblZipCity.TabIndex = 8;
            this.lblZipCity.Text = "1188, Budapest";
            this.lblZipCity.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblCountry
            // 
            this.lblCountry.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblCountry.ForeColor = System.Drawing.Color.White;
            this.lblCountry.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.lblCountry.Location = new System.Drawing.Point(537, 101);
            this.lblCountry.Name = "lblCountry";
            this.lblCountry.RightToLeft = System.Windows.Forms.RightToLeft.No;
            this.lblCountry.Size = new System.Drawing.Size(314, 20);
            this.lblCountry.TabIndex = 9;
            this.lblCountry.Text = "Hungary";
            this.lblCountry.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblStreetHouseNo
            // 
            this.lblStreetHouseNo.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblStreetHouseNo.ForeColor = System.Drawing.Color.White;
            this.lblStreetHouseNo.ImageAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.lblStreetHouseNo.Location = new System.Drawing.Point(537, 122);
            this.lblStreetHouseNo.Name = "lblStreetHouseNo";
            this.lblStreetHouseNo.RightToLeft = System.Windows.Forms.RightToLeft.No;
            this.lblStreetHouseNo.Size = new System.Drawing.Size(314, 20);
            this.lblStreetHouseNo.TabIndex = 10;
            this.lblStreetHouseNo.Text = "Buksi utca 40/B";
            this.lblStreetHouseNo.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // btnRemove
            // 
            this.btnRemove.FlatAppearance.BorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(181)))), ((int)(((byte)(130)))), ((int)(((byte)(64)))));
            this.btnRemove.FlatAppearance.BorderSize = 2;
            this.btnRemove.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(181)))), ((int)(((byte)(130)))), ((int)(((byte)(64)))));
            this.btnRemove.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(181)))), ((int)(((byte)(130)))), ((int)(((byte)(64)))));
            this.btnRemove.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnRemove.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnRemove.ForeColor = System.Drawing.SystemColors.ButtonHighlight;
            this.btnRemove.Location = new System.Drawing.Point(708, 44);
            this.btnRemove.Name = "btnRemove";
            this.btnRemove.Size = new System.Drawing.Size(143, 28);
            this.btnRemove.TabIndex = 11;
            this.btnRemove.Text = "REMOVE";
            this.btnRemove.UseVisualStyleBackColor = true;
            this.btnRemove.Click += new System.EventHandler(this.btnRemove_Click);
            // 
            // lblId
            // 
            this.lblId.AutoSize = true;
            this.lblId.Location = new System.Drawing.Point(171, 122);
            this.lblId.Name = "lblId";
            this.lblId.Size = new System.Drawing.Size(35, 13);
            this.lblId.TabIndex = 12;
            this.lblId.Text = "label1";
            this.lblId.Visible = false;
            // 
            // EventsBlank
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(50)))), ((int)(((byte)(50)))), ((int)(((byte)(50)))));
            this.Controls.Add(this.lblId);
            this.Controls.Add(this.btnRemove);
            this.Controls.Add(this.lblStreetHouseNo);
            this.Controls.Add(this.lblCountry);
            this.Controls.Add(this.lblZipCity);
            this.Controls.Add(this.lblFullDay);
            this.Controls.Add(this.lblCategory);
            this.Controls.Add(this.lblDate);
            this.Controls.Add(this.btnModify);
            this.Controls.Add(this.lblTitle);
            this.Controls.Add(this.pictureBox1);
            this.Name = "EventsBlank";
            this.Size = new System.Drawing.Size(862, 150);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.Label lblTitle;
        private System.Windows.Forms.Button btnModify;
        private System.Windows.Forms.Label lblDate;
        private System.Windows.Forms.Label lblCategory;
        private System.Windows.Forms.Label lblFullDay;
        private System.Windows.Forms.Label lblZipCity;
        private System.Windows.Forms.Label lblCountry;
        private System.Windows.Forms.Label lblStreetHouseNo;
        private System.Windows.Forms.Button btnRemove;
        private System.Windows.Forms.Label lblId;
    }
}
