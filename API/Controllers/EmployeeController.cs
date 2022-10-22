using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using API.Models;
using API.Interfaces;
using API.Database;
using API.Hashing;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {        // GET: api/Employee
        [EnableCors("OpenPolicy")]
        [HttpGet(Name = "GetEmployees")]
        public List<Employee> Get()
        {
            IReadAllEmployees readObject = new ReadAllEmployees();
            return readObject.GetAllEmployees();
        }

        // GET: api/Employee/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetEmployee")]
        public Employee Get(int id)
        {
            IReadEmployee read = new ReadAllEmployees();
            return read.GetEmployee(id);
        }

        // POST: api/Employee
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public JsonResult Post([FromBody] Employee login)
        {
            System.Console.WriteLine("Made it to post");
            HashGen hasher = new HashGen();
            System.Console.WriteLine("Employee in controller: "+login.Emp_ID);
            bool isValid = hasher.CheckUser(login);
            JsonResult myResult = new JsonResult(isValid);
            System.Console.WriteLine(myResult.Value);

            return myResult;
        }

        // PUT: api/Employee/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Employee/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
