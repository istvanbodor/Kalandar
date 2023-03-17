namespace Kalandar
{
    partial class CalendarDayNumberUserControl
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
            this.lblDayNumber = new System.Windows.Forms.Label();
            this.btnDay = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // lblDayNumber
            // 
            this.lblDayNumber.Location = new System.Drawing.Point(0, 0);
            this.lblDayNumber.Name = "lblDayNumber";
            this.lblDayNumber.Size = new System.Drawing.Size(100, 23);
            this.lblDayNumber.TabIndex = 2;
            // 
            // btnDay
            // 
            this.btnDay.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(50)))), ((int)(((byte)(50)))), ((int)(((byte)(50)))));
            this.btnDay.FlatAppearance.BorderSize = 0;
            this.btnDay.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(86)))), ((int)(((byte)(57)))), ((int)(((byte)(21)))));
            this.btnDay.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(109)))), ((int)(((byte)(73)))), ((int)(((byte)(27)))));
            this.btnDay.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnDay.Font = new System.Drawing.Font("Microsoft Sans Serif", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnDay.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(181)))), ((int)(((byte)(130)))), ((int)(((byte)(64)))));
            this.btnDay.Location = new System.Drawing.Point(0, 0);
            this.btnDay.Name = "btnDay";
            this.btnDay.Size = new System.Drawing.Size(120, 106);
            this.btnDay.TabIndex = 1;
            this.btnDay.Text = "1";
            this.btnDay.UseVisualStyleBackColor = false;
            // 
            // CalendarDayNumberUserControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.btnDay);
            this.Controls.Add(this.lblDayNumber);
            this.Name = "CalendarDayNumberUserControl";
            this.Size = new System.Drawing.Size(120, 106);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Label lblDayNumber;
        private System.Windows.Forms.Button btnDay;
    }
}
