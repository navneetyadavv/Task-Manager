import { useState } from "react";
import styles from "./CreateCategoryModal.module.css";

function CreateCategoryModal({ onClose, onCategoryCreate }) {
  
  // This state keeps track of what the user types into the input box.
  const [newCategory, setNewCategory] = useState("");
  const handleCreate = () => {
    if (newCategory.trim()) {
      onCategoryCreate(newCategory);
      onClose();
    }
  };

  return (
    <div className={styles.modalBackground} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {/* This is the input box where the user types the new category */}
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter new category"
          className={styles.categoryInput}
        />
        <div className={styles.buttonContainer}>
          {/* This button closes the modal without creating a new category */}
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          {/* This button creates the new category and then closes the modal */}
          <button onClick={handleCreate} className={styles.createButton}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCategoryModal;
