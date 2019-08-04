using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Services;
using System.IO;
using Microsoft.Azure.Storage.Blob;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private BlobStorage _blobStorage;

        public ValuesController(BlobStorage blob)
        {
            _blobStorage = blob;
        }
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] string file)
        {
            using (var stream = new MemoryStream(Convert.FromBase64String(file)))
            {
                try
                {
                    CloudBlobContainer container = await this._blobStorage.GetContainerByName("bat-sound-files");
                    CloudBlockBlob blob = await this._blobStorage.UploadBlobByReference(Guid.NewGuid().ToString(), stream, container);
                    return Ok(new { soundUri = blob.Uri.AbsoluteUri });
                }
                catch(Exception ex)
                {
                    return BadRequest(ex);
                }
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
