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
    public class AssignmentController : ControllerBase
    {
        // GET: api/Assignment
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Assignment/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetActive")]
        public List<Assignment> Get(int id)
        {
            IReadAllEmployees read = new ReadAllEmployees();
            List<Employee> temp = read.GetAllEmployees();
            foreach (Employee item in temp)
            {
                if(item.IsManager == true && item.Emp_ID==id){
                System.Console.WriteLine("Employee is a manager");
                IReadAllAssignments readlist = new GetManagerActiveTasks();
                return readlist.GetAssignments(id);
            }
            }
                System.Console.WriteLine("Employee not a manager");
                IReadAllAssignments reader = new GetActiveAssignments();
                return reader.GetAssignments(id);; 

        }

        // POST: api/Assignment
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Assignment/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Assignment/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
