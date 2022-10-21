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
            IReadAllEmployees readObject = new ReadAllEmployees();
            List<Employee> newList = readObject.GetAllEmployees();
            // foreach(Employee emp in newList){
            //     System.Console.WriteLine(emp.EmailAddress);
            // }
            Employee myEmp = newList.Find(x => x.Emp_ID == employee.Emp_ID);
            bool isValid = HashGenerator(employee.PasswordHash, myEmp);
            return isValid;
        }
        public bool HashGenerator(string plainText, Employee emp)
        {
            System.Console.WriteLine(plainText);
            SHA256 mySHA = SHA256.Create();
            byte[] bytes = Encoding.ASCII.GetBytes(plainText);
            mySHA.ComputeHash(bytes);
            byte[] byteSha = mySHA.ComputeHash(bytes);
            System.Text.UTF8Encoding enc = new System.Text.UTF8Encoding();
            string s = enc.GetString(byteSha);
            string byteEmpHash = emp.PasswordHash;
            return VerifyHash(s, byteEmpHash);
        }
        public bool VerifyHash(string s, string passHash)
        {
            System.Console.WriteLine("made it to verify");
            System.Console.WriteLine("Byte 1:");
            System.Console.WriteLine(s);
            //PrintByteArray(s);
            System.Console.WriteLine("Byte 2:");
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
        public static void PrintByteArray(byte[] array)
        {
            for (int i = 0; i < array.Length; i++)
            {
                Console.Write($"{array[i]:X2}");
                if ((i % 4) == 3) Console.Write(" ");
            }
            Console.WriteLine();
        }
    }
}