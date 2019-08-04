import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import Button from '@material-ui/core/Button';
import azure from 'azure-storage';
import axios from 'axios';

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

function uploadDocument(files: File[]) {
  const blobService = azure.createBlobService(
    'DefaultEndpointsProtocol=https;AccountName=batmanproject;AccountKey=A7rh5bA9rFfVBrF40YG1ABOyShWc2Wghm0glR0MktuyOLuwA2AOFhCuyaCa1vPiWh/AokyjR6Q39l9qHhfGHbg==;EndpointSuffix=core.windows.net'
  );

  if (files.length > 0) {
    const container = 'bat-sound-files';
    const fr = new FileReader();
    const filename = files[0].name;

    fr.onloadend = function() {
      blobService.createContainerIfNotExists(container, error => {
        if (error) return console.log(error);
        blobService.createBlockBlobFromBrowserFile(
          container,
          filename,
          files[0],
          {},
          (error: any, result: any) => {
            if (error) return console.log(error);
            console.dir(result, { depth: null, colors: true });
          }
        );
      });
    };
    fr.readAsBinaryString(files[0]);
  }
}

export default UploadComponent;
