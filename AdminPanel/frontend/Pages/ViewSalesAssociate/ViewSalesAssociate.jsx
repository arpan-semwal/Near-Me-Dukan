import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Navbar from '../../components/Navbar/Navbar';
import baseURL from '../../metro';

export default function ViewSalesAssociate() {
  const [salesAssociates, setSalesAssociates] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(4);

  useEffect(() => {
    async function fetchSalesAssociates() {
      try {
        const response = await axios.get(`${baseURL}/sales-executives`);
        setSalesAssociates(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sales associates:', error);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchSalesAssociates();
  }, []);

  const downloadSalesAssociatesAsExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(salesAssociates);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SalesAssociates');
    XLSX.writeFile(workbook, 'sales_associates.xlsx');
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = salesAssociates.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(salesAssociates.length / entriesPerPage);

  const nextPage = () => {
    if (indexOfLastEntry < salesAssociates.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <h2>Sales Associates</h2>
      <button onClick={downloadSalesAssociatesAsExcel}>Export to Excel</button>
      <table>
        <thead>
          <tr>
            <th>Mobile No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Pincode</th>
            <th>UPID</th>
            <th>Pancard</th>
            <th>Aadhar Card</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((associate, index) => (
            <tr key={index}>
              <td>{associate.mobileNo}</td>
              <td>{associate.firstName}</td>
              <td>{associate.lastName}</td>
              <td>{associate.pincode}</td>
              <td>{associate.upi}</td>
              <td>{associate.pancard}</td>
              <td>{associate.aadhar}</td>
              <td>
                <Link to={`/update_sales/${associate.mobileNo}`}>Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          {'<'}
        </button>
        <span>{currentPage}</span>
        <button onClick={nextPage} disabled={indexOfLastEntry >= salesAssociates.length}>
          {'>'}
        </button>
      </div>
    </div>
  );
}
