import React, { useEffect, useState } from "react";
import InputForm from "../../SharedComponents/InputForm/InputForm";
import Input from "../../SharedComponents/Input/Input";
import styles from "./EntityPopup.module.css";

const EntityPopup = ({
  title,
  type,
  entityType,
  entity,
  onClose,
  onSave,
  onDelete,
}) => {
  const [formData, setFormData] = useState(entity || {});

  useEffect(() => {
    setFormData(entity || {});
  }, [entity]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className={styles.modal_backdrop}>
      <div className={styles.modal_content}>
        {type !== "delete" ? (
          <div>
            <InputForm title={title} style={{ width: "fit-content" }}>
              {Object.entries(entityType).map(([key, field]) => (
                <Input
                  key={key}
                  type={
                    field.type === "int"
                      ? "number"
                      : field.type === "double"
                      ? "number"
                      : field.type === "datetime"
                      ? "datetime-local"
                      : field.type === "boolean"
                      ? "checkbox"
                      : "text"
                  }
                  name={key}
                  placeholder={field.label}
                  value={formData[key]}
                  onChange={handleChange}
                  checked={field.type === "boolean" ? formData[key] ?? false : undefined}
                />
              ))}
            </InputForm>
          </div>
        ) : (
          <div>
            <p className="fs-4" style={{color: "var(--text-color-2)"}}>Are you sure you want to delete this entity with id: {entity["id"]}?</p>
          </div>
        )}
        <div className="d-flex justify-content-center gap-2 mt-3">
          {type === "delete" ? (
            <button type="button" className="btn btn-danger flex-grow-1" onClick={() => onDelete(formData["id"])}>
              Delete
            </button>
          ) : (
            <button type="button" className="btn btn-primary flex-grow-1" onClick={() => onSave(formData)}>
              Save
            </button>
          )}
          <button type="button" className="btn btn-secondary flex-grow-1" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntityPopup;
