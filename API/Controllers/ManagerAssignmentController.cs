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
    public class ManagerAssignmentController : ControllerBase
    {
        // GET: api/ManagerAssignment
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ManagerAssignment/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetAssigned")]
        public List<Assignment> GetAssigned(int id)
        {
                IReadAllAssignments readlist = new GetManagerAssignedTasks();
                return readlist.GetAssignments(id);

        }

        // POST: api/ManagerAssignment
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/ManagerAssignment/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ManagerAssignment/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
