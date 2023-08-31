'use client';

import {
  useCallback,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

interface DropZoneProps {
  setImageFile: Dispatch<SetStateAction<string>>;
  setImage: Dispatch<SetStateAction<any>>;
}

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const DropZone: React.FC<DropZoneProps> = ({ setImageFile, setImage }) => {
  const [name, setName] = useState('');
  const onDrop = useCallback((acceptedFiles: any) => {
    setName(acceptedFiles[0].name);
    setImage(acceptedFiles[0]);
    if (acceptedFiles) {
      const fileRef = acceptedFiles[0] || '';
      const fileType: string = fileRef.type || '';
      if (
        fileType === 'image/jpeg' ||
        fileType === 'image/png' ||
        fileType === 'image/jpg'
      ) {
        const reader = new FileReader();

        reader.readAsBinaryString(fileRef);
        reader.onload = (ev: any) => {
          // convert it to base64
          setImageFile(`data:${fileType};base64,${btoa(ev.target.result)}`);
        };
      } else {
        toast.error('file is not a type of image');
      }
    }
  }, []); // eslint-disable-line

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: {
        'image/jpeg': [],
        'image/png': [],
        'image/jpg': [],
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="mt-4">
      {/*  @ts-ignore */}
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {name.length === 0 ? (
          <p>Drag and drop your image here, or click to select file</p>
        ) : (
          <p>{name}</p>
        )}
      </div>
    </div>
  );
};

export default DropZone;
