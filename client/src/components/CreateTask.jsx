import styles from "./CreateTask.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import Datepicker from "./Datepicker";
import { createTask } from "../features/task/taskSlice";
import CreateCategoryModal from "./CreateCategoryModal";

function CreateTask({ onClose }) {
  
  // State to manage the visibility of various dropdowns and modals
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);

  // Redux dispatch function to dispatch actions
  const dispatch = useDispatch();

  // Ref to manage the date picker modal
  const datePickerRef = useRef(null);

  // State to manage form data
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "",
    date: new Date(),
  });

  const { title, date, category, priority } = formData;

  // Get categories from the Redux store
  const { categories } = useSelector((state) => state.task);

  // Predefined priorities
  const priorities = ["Low", "Medium", "High"];

  // Handle input changes for the form
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle date changes from the date picker
  const onDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  // Handle category selection
  const onCategoryChange = (category) => {
    setFormData({ ...formData, category: category || null });
    setShowCategoryDropdown(false);
  };

  // Handle priority selection
  const onPriorityChange = (priority) => {
    setFormData({ ...formData, priority: priority || null });
    setShowPriorityDropdown(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      ...formData,
      date: formData.date || null,
      category: formData.category || null,
      priority: formData.priority || null,
    };
    dispatch(createTask(taskData));
    onClose();
  };

  // Handle the "Done" button click in the date picker
  const handleDoneClick = () => {
    setShowDatePicker(false);
  };

  // Handle the "Cancel" button click in the date picker
  const handleCancelClick = () => {
    setShowDatePicker(false);
  };

  // Format the date for display
  const formatDate = (date) => {
    if (!date) return "Date";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className={styles.modalBackground} onClick={onClose}>
        <div
          className={styles.modalContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            {/* Input for the task title */}
            <input
              className={styles.titleInput}
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="What is your next task?"
              required
            />
            <div className={styles.formChildFlex}>
              <div className={styles.datePickerContainer}>
                {/* Button to toggle the date picker */}
                <button
                  type="button"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className={styles.dateButton}
                >
                  {formatDate(date)}
                </button>

                {/* Date picker modal */}
                {showDatePicker && (
                  <div className={styles.modalBackground}>
                    <div className={styles.datePickerModal} ref={datePickerRef}>
                      <Datepicker
                        selectedDate={date}
                        onDateChange={onDateChange}
                        onDoneClick={handleDoneClick}
                        onCancelClick={handleCancelClick}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.categoryPickerContainer}>
                {/* Button to toggle the category dropdown */}
                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className={styles.categoryButton}
                >
                  {category || "Category"}
                </button>

                {/* Category dropdown */}
                {showCategoryDropdown && (
                  <div className={styles.categoryDropdown}>
                    {categories.map((cat, index) => (
                      <div key={index} onClick={() => onCategoryChange(cat)}>
                        {cat}
                      </div>
                    ))}
                    <div onClick={() => setShowCreateCategoryModal(true)}>
                      {" "}
                      + Create New
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.priorityPickerContainer}>
                {/* Button to toggle the priority dropdown */}
                <button
                  type="button"
                  onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                  className={styles.priorityButton}
                >
                  {priority || "Priority"}
                </button>

                {/* Priority dropdown */}
                {showPriorityDropdown && (
                  <div className={styles.priorityDropdown}>
                    {priorities.map((pri, index) => (
                      <div key={index} onClick={() => onPriorityChange(pri)}>
                        {pri}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Submit button */}
              <button type="submit" className={styles.formSubmit}>
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Modal for creating a new category */}
      {showCreateCategoryModal && (
        <CreateCategoryModal
          onClose={() => setShowCreateCategoryModal(false)}
          onCategoryCreate={onCategoryChange}
        />
      )}
    </>
  );
}

export default CreateTask;
