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

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {        // GET: api/Employee
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public List<Employee> Get()
        {
            IReadAllEmployees readObject = new ReadAllEmployees();
            return readObject.GetAllEmployees();
        }

        // GET: api/Employee/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Employee
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public ActionResult LoginAttempt(Employee employee)
        {
         return ;
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
