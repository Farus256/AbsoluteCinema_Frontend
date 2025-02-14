import React, { useEffect, useState } from "react";
import styles from "./EntityComponent.module.css";

// { tableName, entityType, fetchUrl, createUrl, updateUrl, deleteUrl}
const EntityComponent = ({ entityType, entityData, tableName }) => {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //         const response = await fetch(fetchUrl);
  //         const result = await response.json();
  //         setData(result);
  //     } catch (error) {
  //         console.error("Error fetching data: ", error);
  //     } finally {
  //         setLoading(false);
  //     }
  // }

  // useEffect(() => {
  //     fetchData();
  // }, [fetchUrl]);

  return (
    <div className="w-100 d-flex flex-column">
      <div
        className="d-flex flex-row fs-4 ps-4 py-3"
        style={{ backgroundColor: "var(--time-color)", height: "12.6%" }}
      >
        <p className="mb-0">{tableName}</p>
        <form className="mx-4 d-flex" action="">
          <input className={styles.search_style} type="text" />
          <button type="sumbit" style={{backgroundColor: "transparent", border: "none", position: "relative", left: "-45px", top: "-2.25px", width: "fit-content"}}>
            <img width="30" height="30" src="../src/assets/search_icon.svg"/>
          </button>
        </form>
        <button className={styles.add_button_style} type="button">Add</button>
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
          className="w-100 p-4"
          style={{ borderCollapse: "separate", borderSpacing: "0px 20px" }}
        >
          <thead>
            <tr className="bg-white shadow">
              {Object.keys(entityType).map((key) => (
                <th key={key} scope="col" className="p-3">
                  {entityType[key]}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entityData.length > 0 ? (
              entityData.map((item, index) => (
                <tr
                  key={index}
                  className={`ps-4 py-3 bg-white shadow-sm ${styles.tbody_tr_style}`}
                >
                  {Object.keys(entityType).map((key) => (
                    <td key={key} className="ps-4 py-3">
                      {item[key]}
                    </td>
                  ))}
                  <td>
                    <div className="d-flex column-gap-3">
                      <button className={styles.action_button} type="button">
                        Update
                      </button>
                      <button className={styles.action_button} type="button">
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
      </div>
    </div>
  );
};

export default EntityComponent;
