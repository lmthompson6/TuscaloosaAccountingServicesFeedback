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
    public class QuestionResponseController : ControllerBase
    {
        // GET: api/QuestionResponse
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/QuestionResponse/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/QuestionResponse
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/QuestionResponse/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/QuestionResponse/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}