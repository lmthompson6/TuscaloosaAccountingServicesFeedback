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
    public class AssessmentController : ControllerBase
    {
        // GET: api/Assessment
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Assessment/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "GetAssessment")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Assessment
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] Assignment remindAssignment)
        {   
            GetSpecificAssignment tempAssign = new GetSpecificAssignment();
            Assignment specific = tempAssign.GetAssignment(remindAssignment.Assign_ID);
            string emailAddy = tempAssign.GetEmailAddress(remindAssignment.Assign_ID);
            SendReminder reminder = new SendReminder();
            reminder.EmailReminder(specific.DueDate, emailAddy);
        }

        // PUT: api/Assessment/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Assessment/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
