// hooks/useTableExport.js
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const useTableExport = () => {
  const getValueByPath = (obj, path) => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  };

  const exportToCSV = (data, columns, filename = "table.csv") => {
    const header = columns.map(col => col.title).join(',');
    const rows = data.map(row =>
      columns.map(col => row[col.dataIndex]).join(',')
    );

    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const exportToExcel = (data, columns, filename = "table.xlsx") => {
    const keys = columns.map(col => col.dataIndex);
    const headers = columns.map(col => col.title);

    const exportData = data.map(row =>
      keys.reduce((acc, key, index) => {
        acc[headers[index]] = row[key];
        return acc;
      }, {})
    );

    const worksheet = XLSX.utils.json_to_sheet(exportData, { header: headers });
    worksheet['!cols'] = columns.map(() => ({ wch: 15 }));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), filename);
  };

  return { exportToCSV, exportToExcel };
};