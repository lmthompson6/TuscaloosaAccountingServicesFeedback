using API.Interfaces;
using API.Models;
using MySql.Data.MySqlClient;
using System.Net.Mail;

namespace API.Database
{
    public class SendReminder
    {
        public void EmailReminder(string due, string emailAddress)
        {
            MailMessage message = new MailMessage();

            message.Subject = "You have a Feedback Assignment Due!";
            message.Body = "Hello, this is a reminder that you have a feedback assignment to complete in the Tuscaloosa Accounting Services Feedback Portal. \n\nThe due date for this assignment is: " +due+"\n\nThank you,\nTAS Management";
            message.From = new MailAddress("misprojectuofalabama@gmail.com", "Tuscaloosa Accounting Services");
            message.To.Add(new MailAddress(emailAddress));
            message.IsBodyHtml = false;

            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            smtp.Credentials = new System.Net.NetworkCredential("misprojectuofalabama@gmail.com", "puoyuntizuijflrv");
            smtp.EnableSsl = true;
            smtp.Send(message);
        }
    }
}