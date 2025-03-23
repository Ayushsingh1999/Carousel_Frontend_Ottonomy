import { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    axios.get("https://carousel-backend-ottonomy.onrender.com/api/images")
      .then(response => setImages(response.data))
      .catch(error => console.error("Error fetching images:", error));
  }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
   try {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);


   await axios.post("https://carousel-backend-ottonomy.onrender.com/api/images/upload", formData)
   setImages([...images, response.data])

   setFile(null);
   setTitle("")
   setDescription("")

   document.getElementById("fileInput").value = null;

   } catch (error) {
    console.log("there is error in file uploading-->>>",error)
   }

  };

  const handleDelete = (id) => {
    axios.delete(`https://carousel-backend-ottonomy.onrender.com/api/images/${id}`)
      .then(() => setImages(images.filter(img => img._id !== id)))
      .catch(error => console.error("Error deleting image:", error));
  };

  // Drag-and-Drop Handlers
  const handleDragStart = (index) => setDraggedIndex(index);

  const handleDragOver = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const reorderedImages = [...images];
    const draggedItem = reorderedImages[draggedIndex];

    // Remove dragged item from array
    reorderedImages.splice(draggedIndex, 1);
    // Insert it at the new position
    reorderedImages.splice(index, 0, draggedItem);

    setDraggedIndex(index);
    setImages(reorderedImages);
  };

  const handleDragEnd = () => setDraggedIndex(null);

  // Save New Order
  const handleSaveOrder = () => {
    const updatedImages = images.map((img, index) => ({
      _id: img._id,
      order: index,
    }));

    axios.put("https://carousel-backend-ottonomy.onrender.com/api/images/order", { updatedImages })
      .then(() => alert("Image order updated successfully!"))
      .catch(error => console.error("Error updating order:", error));
  };

  return (
    <div className="container mt-4">
      <h2>Settings</h2>
      
      {/* Upload Section */}
      <div className="mb-3">
        <input type="file" onChange={handleFileChange} className="form-control mb-2" />
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="form-control mb-2" />
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="form-control mb-2" />
        <button onClick={handleUpload} className="btn btn-success">Upload Image</button>
      </div>
      
      {/* Image List with Drag-and-Drop */}
      <h3>Manage Images</h3>
      <p>To change the order of images in carousel drag the images make in order as you want. </p>
      <ul className="list-group">
        {images.map((img, index) => (
          <li key={img._id} 
              className="list-group-item d-flex justify-content-between align-items-center"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => { e.preventDefault(); handleDragOver(index); }}
              onDragEnd={handleDragEnd}
          >
            <span>{index + 1}. {img.title}</span>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(img._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {images.length > 0 && (
        <button onClick={handleSaveOrder} className="btn btn-primary mt-3">Save Order</button>
      )}
    </div>
  );
};

export default Settings;
