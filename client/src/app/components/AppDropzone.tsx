import { UploadFile } from '@mui/icons-material';
import { FormControl, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  handlePictureChange: (pictureUrl: any) => void;
}

const AppDropzone = ({handlePictureChange}: Props) => {
  const dropzoneStyles = {
    display: "flex",
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "5px",
    paddingTop: "30px",
    alignItems: "center",
    height: 200,
    width: 500,
    cursor: "pointer"
  };

  const dropzoneActive = {
    borderColor: "green"
  };

  const onDrop = useCallback(acceptedFiles => {
      acceptedFiles[0] = Object.assign(acceptedFiles[0], {preview: URL.createObjectURL(acceptedFiles[0])});
      handlePictureChange(acceptedFiles[0])
  }, [handlePictureChange])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <FormControl style={isDragActive ? {...dropzoneStyles, ...dropzoneActive} : dropzoneStyles}>
        <input {...getInputProps()} />
        <UploadFile sx={{ fontSize: "100px" }} />
        <Typography variant="h4">Drop image here</Typography>
      </FormControl>
    </div>
  )
}

export default AppDropzone;