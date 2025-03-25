import "./style.css";

const EmployeesTable = ({ data, columns, actions }) => {
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <table className="users-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
            {actions && actions.length > 0 && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
              {actions && actions.length > 0 && (
                <td>
                  {actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => action.handler(item)}
                      className="users-table-btn"
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;
