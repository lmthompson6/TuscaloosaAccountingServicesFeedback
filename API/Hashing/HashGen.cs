using System.Security.Cryptography;
using API.Models;
using API.Interfaces;
using API.Database;
using System.Text;

namespace API.Hashing
{
    public class HashGen
    {
        public bool CheckUser(Employee employee)
        {   
            // System.Console.WriteLine(employee.Emp_ID);
            IReadAllEmployees readObject = new ReadAllEmployees();
            List<Employee> newList = readObject.GetAllEmployees();
            Employee myEmp = newList.Find(x => x.Emp_ID == employee.Emp_ID);
            // System.Console.WriteLine(myEmp.Emp_ID);
            bool isValid = HashGenerator(employee.PasswordHash, myEmp);
            return isValid;
        }
        public bool HashGenerator(string plainText, Employee emp)
        {
            // System.Console.WriteLine(plainText);
            // System.Console.WriteLine(emp.Emp_ID);
            string s = ToSHA256(plainText);
            return VerifyHash(s, emp.PasswordHash);
        }
        public bool VerifyHash(string s, string passHash)
        {
            System.Console.WriteLine("Hash for plaintext entered:");
            System.Console.WriteLine(s);
            //PrintByteArray(s);
            System.Console.WriteLine("Hash for employee that was found:");
            System.Console.WriteLine(passHash);
            //PrintByteArray(passHash);
            if (s == passHash)
            {   System.Console.WriteLine("Returning true");
                return true;
            }
            else
            {   System.Console.WriteLine("Returning false");
                return false;
            }
        }

        private string ToSHA256(string plainText){
            using var sha256 = SHA256.Create();
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(plainText));

            var stringBuilder = new StringBuilder();
            for(int i = 0; i<bytes.Length; i++){
                stringBuilder.Append(bytes[i].ToString("x2"));
            }
            return stringBuilder.ToString();
        }
    }
}