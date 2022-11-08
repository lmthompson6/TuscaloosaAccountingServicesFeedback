using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssessmentController : ControllerBase
    {
        // GET: api/Assessment
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Assessment/5
        [HttpGet("{id}", Name = "GetAssessment")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Assessment
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Assessment/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Assessment/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
