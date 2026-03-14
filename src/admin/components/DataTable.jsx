import React from 'react';

const DataTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  loading = false,
  actions = true,
}) => {
  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading data...</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
        No data available
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id || index}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {actions && (
                <td>
                  <div className="action-buttons">
                    {onView && (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => onView(row)}
                      >
                        View
                      </button>
                    )}
                    {onEdit && (
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => onEdit(row)}
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          if (window.confirm('Are you sure?')) {
                            onDelete(row);
                          }
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
