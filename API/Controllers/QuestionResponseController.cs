using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Database;
using API.Models;
using API.Interfaces;
using Microsoft.AspNetCore.Cors;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionResponseController : ControllerBase
    {
        // GET: api/QuestionResponse
        [EnableCors("OpenPolicy")]
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/QuestionResponse/5
        [EnableCors("OpenPolicy")]
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/QuestionResponse
        [EnableCors("OpenPolicy")]
        [HttpPost]
        public void Post([FromBody] Response newResponse)
        {
            if (newResponse.Response_ID == 0)
            {
                SubmitReponses statusChange = new SubmitReponses();
                statusChange.awaitingStatus(newResponse.Assign_ID);
            }
            else
            {
                IUpdateResponse submission = new SubmitReponses();
                submission.updateReponses(newResponse);
            }

        }

        // PUT: api/QuestionResponse/5
        [EnableCors("OpenPolicy")]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/QuestionResponse/5
        [EnableCors("OpenPolicy")]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
