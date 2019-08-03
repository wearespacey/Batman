declare module 'filepond-plugin-file-validate-size';

interface FilePondFileValidateSize {
  allowFileSizeValidation?: boolean;
  maxFileSize?: string;
  maxTotalFileSize?: string;
  labelMaxFileSizeExceeded?: string;
  labelMaxFileSize?: string;
  labelMaxTotalFileSizeExceeded?: string;
  labelMaxTotalFileSize?: string;
}

export interface FilePondProps extends FilePondFileValidateSize {}
