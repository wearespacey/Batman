import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import Button from '@material-ui/core/Button';
import {
  Aborter,
  BlobURL,
  BlockBlobURL,
  ContainerURL,
  ServiceURL,
  StorageURL,
  AnonymousCredential
} from '@azure/storage-blob';

class UploadComponent extends Component {
  pond: any;
  state = { files: [] };
  constructor(props: Readonly<{}>) {
    super(props);
  }

  render() {
    return (
      <div className="AppContent UploadPage">
        <FilePond
          ref={ref => (this.pond = ref)}
          allowMultiple={false}
          onupdatefiles={fileItems => {
            this.setState({ files: fileItems.map(fileItem => fileItem.file) });
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => uploadDocument(this.state.files)}
        >
          Upload
        </Button>
      </div>
    );
  }
}

async function uploadDocument(files: File[]) {
  const container = 'bat-sound-files';
  const account = 'batmanproject';
  const accountSas = '?' + process.env.REACT_APP_AZURE_BLOB_SAS_TOKEN;

  // Use SharedKeyCredential with storage account and account key
  const anonCredential = new AnonymousCredential();
  const pipeline = StorageURL.newPipeline(anonCredential);
  const serviceURL = new ServiceURL(
    `https://${account}.blob.core.windows.net${accountSas}`,
    pipeline
  );
  const containerURL = ContainerURL.fromServiceURL(serviceURL, container);

  if (files.length > 0) {
    const fr = new FileReader();
    const filename = files[0].name;

    fr.onloadend = async function() {
      const content = fr.result as string;
      const blobName = filename + '_' + new Date().getTime();
      const blobURL = BlobURL.fromContainerURL(containerURL, blobName);
      const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
      const uploadBlobResponse = await blockBlobURL.upload(
        Aborter.none,
        content,
        content.length
      );

      console.log(
        `Upload block blob ${blobName} successfully`,
        uploadBlobResponse.requestId
      );
      // TODO: Clear files array / Display toast (success) / Get URL to uplaod in DB
    };
    fr.readAsBinaryString(files[0]);
  }
}

export default UploadComponent;
