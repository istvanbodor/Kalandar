namespace Kalandar
{
    partial class UserEventsForm
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

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(UserEventsForm));
            this.pnlTop = new System.Windows.Forms.Panel();
            this.lblDate = new System.Windows.Forms.Label();
            this.btnExit = new System.Windows.Forms.Button();
            this.panel2 = new System.Windows.Forms.Panel();
            this.btnAddEvent = new System.Windows.Forms.Button();
            this.pnlEvents = new System.Windows.Forms.FlowLayoutPanel();
            this.pnlTop.SuspendLayout();
            this.panel2.SuspendLayout();
            this.SuspendLayout();
            // 
            // pnlTop
            // 
            this.pnlTop.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(30)))), ((int)(((byte)(30)))));
            this.pnlTop.Controls.Add(this.btnExit);
            this.pnlTop.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlTop.Location = new System.Drawing.Point(0, 0);
            this.pnlTop.Name = "pnlTop";
            this.pnlTop.Size = new System.Drawing.Size(892, 54);
            this.pnlTop.TabIndex = 0;
            this.pnlTop.MouseDown += new System.Windows.Forms.MouseEventHandler(this.pnlTop_MouseDown);
            this.pnlTop.MouseMove += new System.Windows.Forms.MouseEventHandler(this.pnlTop_MouseMove);
            // 
            // lblDate
            // 
            this.lblDate.Font = new System.Drawing.Font("Microsoft Sans Serif", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblDate.ForeColor = System.Drawing.SystemColors.ButtonFace;
            this.lblDate.Location = new System.Drawing.Point(0, 0);
            this.lblDate.Name = "lblDate";
            this.lblDate.Size = new System.Drawing.Size(831, 48);
            this.lblDate.TabIndex = 4;
            this.lblDate.Text = "DATE";
            this.lblDate.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // btnExit
            // 
            this.btnExit.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(68)))), ((int)(((byte)(68)))), ((int)(((byte)(68)))));
            this.btnExit.Dock = System.Windows.Forms.DockStyle.Right;
            this.btnExit.FlatAppearance.BorderSize = 0;
            this.btnExit.FlatAppearance.MouseDownBackColor = System.Drawing.Color.DarkRed;
            this.btnExit.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Red;
            this.btnExit.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnExit.Font = new System.Drawing.Font("Orbitron", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnExit.ForeColor = System.Drawing.SystemColors.ButtonHighlight;
            this.btnExit.Location = new System.Drawing.Point(834, 0);
            this.btnExit.Name = "btnExit";
            this.btnExit.Size = new System.Drawing.Size(58, 54);
            this.btnExit.TabIndex = 3;
            this.btnExit.Text = "X";
            this.btnExit.UseVisualStyleBackColor = false;
            this.btnExit.Click += new System.EventHandler(this.btnExit_Click);
            // 
            // panel2
            // 
            this.panel2.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(35)))), ((int)(((byte)(35)))), ((int)(((byte)(35)))));
            this.panel2.Controls.Add(this.lblDate);
            this.panel2.Controls.Add(this.btnAddEvent);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Top;
            this.panel2.Location = new System.Drawing.Point(0, 54);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(892, 48);
            this.panel2.TabIndex = 1;
            // 
            // btnAddEvent
            // 
            this.btnAddEvent.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(35)))), ((int)(((byte)(35)))), ((int)(((byte)(35)))));
            this.btnAddEvent.Dock = System.Windows.Forms.DockStyle.Right;
            this.btnAddEvent.FlatAppearance.BorderSize = 0;
            this.btnAddEvent.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(35)))), ((int)(((byte)(35)))), ((int)(((byte)(35)))));
            this.btnAddEvent.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(35)))), ((int)(((byte)(35)))), ((int)(((byte)(35)))));
            this.btnAddEvent.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnAddEvent.Font = new System.Drawing.Font("Orbitron", 24F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnAddEvent.ForeColor = System.Drawing.SystemColors.ButtonHighlight;
            this.btnAddEvent.Location = new System.Drawing.Point(837, 0);
            this.btnAddEvent.Name = "btnAddEvent";
            this.btnAddEvent.Size = new System.Drawing.Size(55, 48);
            this.btnAddEvent.TabIndex = 4;
            this.btnAddEvent.Text = "+";
            this.btnAddEvent.UseVisualStyleBackColor = false;
            this.btnAddEvent.Click += new System.EventHandler(this.btnAddEvent_Click);
            // 
            // pnlEvents
            // 
            this.pnlEvents.AutoScroll = true;
            this.pnlEvents.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(10)))), ((int)(((byte)(10)))), ((int)(((byte)(10)))));
            this.pnlEvents.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlEvents.Location = new System.Drawing.Point(0, 102);
            this.pnlEvents.Name = "pnlEvents";
            this.pnlEvents.Size = new System.Drawing.Size(892, 607);
            this.pnlEvents.TabIndex = 2;
            // 
            // UserEventsForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(51)))), ((int)(((byte)(51)))), ((int)(((byte)(51)))));
            this.ClientSize = new System.Drawing.Size(892, 709);
            this.Controls.Add(this.pnlEvents);
            this.Controls.Add(this.panel2);
            this.Controls.Add(this.pnlTop);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "UserEventsForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "UserEventsForm";
            this.pnlTop.ResumeLayout(false);
            this.panel2.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel pnlTop;
        private System.Windows.Forms.Button btnExit;
        private System.Windows.Forms.Label lblDate;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Button btnAddEvent;
        public System.Windows.Forms.FlowLayoutPanel pnlEvents;
    }
}