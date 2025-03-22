import React from "react";

const ImageList = ({ images, setImages }) => {
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/images/${id}`, { method: "DELETE" });
    setImages(images.filter((img) => img._id !== id));
  };

  return (
    <div>
      <h3>Manage Images</h3>
      {images.map((image) => (
        <div key={image._id} className="d-flex align-items-center">
          <img src={`http://localhost:5000${image.imageUrl}`} width="100" alt={image.title} />
          <p>{image.title}</p>
          <button className="btn btn-danger ms-3" onClick={() => handleDelete(image._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
