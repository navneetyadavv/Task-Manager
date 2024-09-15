// CreateTask.js
import styles from "./CreateTask.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import Datepicker from "./Datepicker";
import { createTask, updateTask } from "../features/task/taskSlice";
import CreateCategoryModal from "./CreateCategoryModal";

function CreateTask({ onClose, initialData }) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
    const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);

    const dispatch = useDispatch();
    const datePickerRef = useRef(null);

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        priority: "",
        date: new Date(),
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                category: initialData.category,
                priority: initialData.priority,
                date: initialData.date ? new Date(initialData.date) : new Date(),
            });
        }
    }, [initialData]);

    const { title, date, category, priority } = formData;
    const { categories } = useSelector((state) => state.task);
    const priorities = ["Low", "Medium", "High"];

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onDateChange = (date) => {
        setFormData({ ...formData, date });
    };

    const onCategoryChange = (category) => {
        setFormData({ ...formData, category: category || null });
        setShowCategoryDropdown(false);
    };

    const onPriorityChange = (priority) => {
        setFormData({ ...formData, priority: priority || null });
        setShowPriorityDropdown(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = {
            ...formData,
            date: formData.date || null,
            category: formData.category || null,
            priority: formData.priority || null,
        };
        if (initialData) {
            dispatch(updateTask({ id: initialData._id, data: taskData }));
        } else {
            dispatch(createTask(taskData));
        }
        onClose();
    };

    const handleDoneClick = () => {
        setShowDatePicker(false);
    };

    const handleCancelClick = () => {
        setShowDatePicker(false);
    };

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
                                <button
                                    type="button"
                                    onClick={() => setShowDatePicker(!showDatePicker)}
                                    className={styles.dateButton}
                                >
                                    {formatDate(date)}
                                </button>
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
                                <button
                                    type="button"
                                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                                    className={styles.categoryButton}
                                >
                                    {category || "Category"}
                                </button>
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
                                <button
                                    type="button"
                                    onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                                    className={styles.priorityButton}
                                >
                                    {priority || "Priority"}
                                </button>
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
                            <button type="submit" className={styles.formSubmit}>
                                {initialData ? "Update Task" : "Add Task"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
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
