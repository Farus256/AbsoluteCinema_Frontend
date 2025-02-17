import React, { useEffect, useState } from "react";
import styles from "./EntityComponent.module.css";
import EntityPopup from "./EntityPopup/EntityPopup";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const EntityComponent = ({
  entityType,
  tableName,
  fetchUrl,
  createUrl,
  updateUrl,
  deleteUrl,
  searchUrl,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canLoad, setCanLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitLoading, setIsInitLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [popup, setPopup] = useState({
    isOpen: false,
    type: "",
  });
  const [entity, setEntity] = useState({
    title: "",
  });
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    if (page == 0 || !canLoad) {
      console.log("abort loading");
      return;
    }

    await sleep(200);

    setIsLoading(true);

    try {
      const response = await fetch(
        `${fetchUrl}?Page=${page}&PageSize=${pageSize}`
      );
      const result = await response.json();
      setData(result);

      if (result.length == 0) {
        setCanLoad(false);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(() => false);
      setIsInitLoading(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const openPopup = (type, entity) => {
    setEntity(entity);
    setPopup((prev) => ({ ...prev, isOpen: true, type: type }));
  };

  const clearPopup = () => {
    setPopup({ isOpen: false, type: "" });
  };

  const onAddHandle = async (newEntity) => {
    console.log(newEntity);
    try {
      const response = await fetch(createUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEntity),
      });

      if (!response.ok) {
        throw new Error(`Failed to add ${entityType}`);
      }


      const result = await response.json();
      console.log("Added entity:", result);
    } catch (error) {
      console.error(`Error adding:`, error);
    } finally {
      clearPopup();
      await fetchData();
    }
  };

  const onUpdateHandle = async (updatedEntity) => {
    try {
      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedEntity),
      });

      if (!response.ok) {
        throw new Error("Failed to update entity");
      }

      const result = await response.json();
      console.log("Updated entity:", result);
    } catch (error) {
      console.error("Error updating entity:", error);
    } finally {
      clearPopup();
      await fetchData();
    }
  };

  const onDeleteHandle = async (entityId) => {
    try {
      const response = await fetch(`${deleteUrl}?id=${entityId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        clearPopup();
        throw new Error("Failed to delete entity");
      }
    } catch (error) {
      console.error("Error deleting entity:", error);
    } finally {
      clearPopup();
      await fetchData();
    }
  };

  const onPrevPageHandle = () => {
    if (page == 1) {
      return;
    }

    if (!canLoad) {
      setCanLoad(true);
    }

    setPage((prev) => prev - 1);
  };

  const onNextPageHandle = () => {
    if (!canLoad) {
      return;
    }

    setPage((prev) => prev + 1);
  };

  const onSearchSubmitHandle = async () => {
    const pairs = searchQuery.split(",").map((pair) => pair.trim());
    let searchObject = {};

    for (const pair of pairs) {
      const match = pair.match(/^(\w+):\s*(.+)$/);
      if (!match) {
        console.log(
          "Невірний формат. Використовуйте 'ключ: значення, ключ: значення'"
        );
        return;
      }

      const key = match[1].trim();
      let value = match[2].trim();

      // Перевіряємо, чи існує ключ у entityType
      if (!entityType[key]) {
        console.log(`Ключ '${key}' не існує в entityType`);
        return;
      }

      // Конвертація значень за типом
      switch (entityType[key].type) {
        case "int":
          if (isNaN(Number(value)) || !Number.isInteger(Number(value))) {
            console.log(`Значення для '${key}' має бути цілим числом`);
            return;
          }
          value = Number(value);
          break;

        case "double":
          if (isNaN(Number(value))) {
            console.log(`Значення для '${key}' має бути десятковим числом`);
            return;
          }
          value = parseFloat(value);
          break;

        case "bool":
          if (!["true", "false"].includes(value.toLowerCase())) {
            console.log(`Значення для '${key}' має бути true або false`);
            return;
          }
          value = value.toLowerCase() === "true";
          break;

        case "datetime":
          const dateValue = new Date(value);
          if (isNaN(dateValue.getTime())) {
            console.log(
              `Значення для '${key}' має бути у форматі дати (YYYY-MM-DD або ISO 8601)`
            );
            return;
          }
          value = dateValue.toISOString(); // Перетворюємо в ISO 8601 формат для API
          break;

        case "string":
          break;

        default:
          console.log(`Невідомий тип для ключа '${key}'`);
          return;
      }

      // Додаємо параметр до об'єкта запиту
      searchObject[key] = value;
    }

    // Перетворюємо об'єкт у query string
    const queryParams = new URLSearchParams(searchObject).toString();

    // Формуємо GET-запит з параметрами
    try {
      const response = await fetch(`${searchUrl}?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Помилка пошуку");

      const result = await response.json();
      setData(result); // Передаємо результати пошуку в батьківський компонент
    } catch (err) {
      console.log("Не вдалося виконати запит: ", err);
    }
  };

  return (
    <div className="w-100">
      <div className="w-100 d-flex flex-column">
        <div
          className="d-flex flex-row fs-4 ps-4 py-3"
          style={{ backgroundColor: "var(--time-color)", height: "12.6%" }}
        >
          <p className="mb-0">{tableName}</p>
          <div className="mx-4 d-flex">
            <input
              className={styles.search_style}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="button"
              style={{
                backgroundColor: "transparent",
                border: "none",
                position: "relative",
                left: "-45px",
                top: "-2.25px",
                width: "fit-content",
              }}
              onClick={onSearchSubmitHandle}
            >
              <img width="30" height="30" src="../src/assets/search_icon.svg" />
            </button>
          </div>
          <button
            className={`btn btn-secondary fs-5 me-3`}
            type="button"
            onClick={fetchData}
          >
            Clear Search
          </button>
          <button
            className={`btn btn-secondary fs-5`}
            type="button"
            onClick={() => openPopup("add", undefined)}
          >
            Add
          </button>
        </div>
        <div
          className="h-100"
          style={{
            backgroundColor: "var(--white-color)",
            color: "var(--text-color-2)",
            fontFamily: "var(--montserrat-font-family)",
          }}
        >
          <table
            className="w-100 p-4 table-responsive"
            style={{ borderCollapse: "separate", borderSpacing: "0px 20px" }}
          >
            <thead>
              <tr className="bg-white shadow">
                {Object.keys(entityType).map((key) => (
                  <th key={key} scope="col" className="p-3">
                    {entityType[key].label}
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr
                    key={index}
                    className={`ps-4 py-3 bg-white shadow-sm ${styles.tbody_tr_style}`}
                  >
                    {Object.keys(entityType).map((key) => (
                      <td key={key} className="ps-4 py-3">
                        <p className="mb-0">{`${item[key]}`}</p>
                      </td>
                    ))}
                    <td>
                      <div className="d-flex column-gap-3 mx-3">
                        <button
                          className={styles.action_button}
                          type="button"
                          onClick={() => openPopup("update", item)}
                        >
                          Update
                        </button>
                        <button
                          className={styles.action_button}
                          type="button"
                          onClick={() => openPopup("delete", item)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={Object.keys(entityType).length + 1}
                    className="text-center p-4"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="d-flex justify-content-center align-items-center pb-3">
            <button
              className="btn btn-primary"
              type="button"
              onClick={onPrevPageHandle}
            >
              prev
            </button>
            <p className="m-0 mx-4">{page}</p>
            <button
              className="btn btn-primary"
              type="button"
              onClick={onNextPageHandle}
            >
              next
            </button>
          </div>
        </div>
      </div>
      {popup.isOpen && (
        <EntityPopup
          title={
            popup.type === "add"
              ? "Add Entity"
              : popup.type === "update"
              ? "Edit Entity"
              : "Confirm Deletion"
          }
          type={popup.type}
          entity={entity}
          entityType={(({ id, ...entityTypeWithoutId }) => entityTypeWithoutId)(
            entityType
          )}
          onClose={clearPopup}
          onSave={popup.type === "add" ? onAddHandle : onUpdateHandle}
          onDelete={onDeleteHandle}
        />
      )}
    </div>
  );
};

export default EntityComponent;
