import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
// import { useTheme } from "@mui/material";
import { Close, RefreshOutlined, ImageOutlined } from "@mui/icons-material";

function ImageUploader({ image: photo, setImage }) {
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  // const { palette } = useTheme();

  const onChange = async (imageList, addUpdateIndex) => {
    // data for submit
    // console.log("iamgelist==>", imageList[0]);
    // console.log("data==>", imageList[0]?.data_url);

    setImages(imageList);
    setImage(imageList[0]?.file);
  };
  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        // onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          <button
            className="rounded-md cursor-pointer border-dotted border-2 w-[200px] h-[200px] flex justify-center items-center"
            // style={{
            //   borderColor: isDragging ? "red" : currentColor,
            // }}
            onClick={!imageList.length && onImageUpload}
            {...dragProps}
          >
            {imageList.map((image, index) => (
              <div key={index} className="relative">
                <img
                  // width={180}
                  // height={180}
                  className="object-cover"
                  alt="pho"
                  src={image["data_url"]}
                />

                <div className="absolute top-1 right-1 flex items-center gap-1">
                  <button onClick={() => onImageUpdate(index)}>
                    {<RefreshOutlined color="primary" size={20} />}
                  </button>
                  <button onClick={() => onImageRemove(index)}>
                    {<Close color="primary" size={20} />}
                  </button>
                </div>
              </div>
            ))}
            {!imageList.length && <ImageOutlined color="primary" size={40} />}
          </button>
        </div>
      )}
    </ImageUploading>
  );
}

export default ImageUploader;
