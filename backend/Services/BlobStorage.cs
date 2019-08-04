using System;
using System.IO;
using System.Threading.Tasks;
using API.Services;
using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.Blob;
using Microsoft.Extensions.Configuration;

namespace backend.Services
{
    public class BlobStorage
    {
        private readonly IConfiguration _configuration;
        private readonly CloudBlobClient _client;

        public BlobStorage(IConfiguration configuration)
        {
            _configuration = configuration;
            ConfigurationHelper helper = new ConfigurationHelper("connectionString.json");

            CloudStorageAccount storageAccount = null;
            if (CloudStorageAccount.TryParse(helper.Get("blobConnectionString"), out storageAccount))
                _client = storageAccount.CreateCloudBlobClient();
            else
                throw new Exception("CloudBlobClient could not be instanciated");
        }

        public async Task<CloudBlockBlob> UploadBlobByReference(string referenceNname, Stream stream, CloudBlobContainer container)
        {
            CloudBlockBlob blob = container.GetBlockBlobReference(referenceNname);
            await blob.UploadFromStreamAsync(stream);
            return blob;
        }

        public async Task<CloudBlobContainer> GetContainerByName(string name)
        {
            CloudBlobContainer container = _client.GetContainerReference(name);
            await container.CreateIfNotExistsAsync();
            return container;
        }
    }
}