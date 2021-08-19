import { useState } from "react";
import { Button, Image } from "antd";
import { firebase } from "@/main";
import ImageUploading from "react-images-uploading";

export default function ImageUpload(props) {
  const [images, setImages] = useState([]);
  const maxNumber = 69;
  const onChange = (imageList) => {
    setImages(imageList);
    const uploadTask = firebase.storage
      .ref(`/images/${imageList[0].file.name}`)
      .putString(imageList[0].data_url.split(",")[1], "base64", {
        contentType: "image/png",
      });
    uploadTask.on("state_changed", console.log, console.error, () => {
      firebase.storage
        .ref("images")
        .child(imageList[0].file.name)
        .getDownloadURL()
        .then((url) => {
          props.image_URL(url);
        });
    });
  };

  return (
    <div className="App">
      {props.defaultImage ? (
        <Image
          src={
            props.defaultImage
              ? props.defaultImage
              : "https://i.stack.imgur.com/y9DpT.jpg"
          }
          alt=""
          width={300}
          style={{ margin: 25 }}
        />
      ) : (
        <b>Зураг байхгүй байна</b>
      )}
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
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <Button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Энд дарж зурагаа оруулна уу
            </Button>
            &nbsp;
            <Button onClick={onImageRemoveAll}>Бүх зургийг устгgх</Button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <Image
                  src={image.data_url}
                  alt=""
                  width={300}
                  style={{ margin: 20 }}
                />
                <div className="image-item__btn-wrapper">
                  <Button onClick={() => onImageUpdate(index)}>
                    Шинэ зураг оруулах
                  </Button>
                  <Button onClick={() => onImageRemove(index)}>Устгах</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
