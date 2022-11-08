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
    public class CompletedAssignmentController : ControllerBase
    {
        // GET: api/CompletedAssignment
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/CompletedAssignment/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetCompleted")]
        public List<Assignment> GetCompleted(int id)
        {
            IReadAllEmployees read = new ReadAllEmployees();
            List<Employee> temp = read.GetAllEmployees();
            foreach (Employee item in temp)
            {
                if(item.IsManager == true && item.Emp_ID==id){
                System.Console.WriteLine("Employee is a manager");
                IReadAllAssignments readlist = new GetManagerCompletedTasks();
                return readlist.GetAssignments(id);
            }
            }
                System.Console.WriteLine("Employee not a manager");
                IReadAllAssignments reader = new GetCompletedAssignments();
                return reader.GetAssignments(id);; 
        }

        // POST: api/CompletedAssignment
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/CompletedAssignment/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/CompletedAssignment/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
