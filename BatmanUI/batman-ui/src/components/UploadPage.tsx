import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
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
          allowFi
          onupdatefiles={fileItems => {
            this.setState({ files: fileItems.map(fileItem => fileItem.file) });
          }}
        />
      </div>
    );
  }
}

export default UploadComponent;
