import { useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiChevronUp,
  FiChevronDown,
  FiSearch,
} from "react-icons/fi";
import { NavLink } from "react-router";
import { useClientListQuery } from "../../store/api/client.api";
import { TClient } from "../../types";

const ClientManagement = () => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TClient;
    direction: "ascending" | "descending";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 5;

  const { data: clientList } = useClientListQuery(1);

  const requestSort = (key: keyof TClient) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredClients =
    clientList?.data?.filter(
      (client: TClient) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const sortedClients = [...filteredClients].sort((a, b) => {
    if (!sortConfig) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue === undefined || bValue === undefined) return 0;

    if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
    return 0;
  });

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = sortedClients.slice(
    indexOfFirstClient,
    indexOfLastClient
  );
  const totalPages = Math.ceil(sortedClients.length / clientsPerPage);

  const renderTableHeader = () => (
    <thead className="bg-gray-50 dark:bg-gray-700">
      <tr>
        {["name", "email", "phone", "company"].map((key) => (
          <th
            key={key}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort(key as keyof TClient)}
          >
            <div className="flex items-center">
              {key.charAt(0).toUpperCase() + key.slice(1)}
              {sortConfig?.key === key &&
                (sortConfig.direction === "ascending" ? (
                  <FiChevronUp className="ml-1" />
                ) : (
                  <FiChevronDown className="ml-1" />
                ))}
            </div>
          </th>
        ))}
        <th
          scope="col"
          className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
        >
          Actions
        </th>
      </tr>
    </thead>
  );

  const renderTableBody = () => (
    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
      {currentClients.length > 0 ? (
        currentClients.map((client) => (
          <tr
            key={client.id}
            className="hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="font-medium text-gray-900 dark:text-white">
                {client.name}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
              {client.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
              {client.phone || "-"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
              {client.company || "-"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-500 mr-4">
                <FiEdit2 />
              </button>
              <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-500">
                <FiTrash2 />
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={5}
            className="px-6 py-4 text-center text-gray-500 dark:text-gray-300"
          >
            No clients found
          </td>
        </tr>
      )}
    </tbody>
  );

  const renderPagination = () =>
    totalPages > 1 && (
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500 dark:text-gray-300">
          Showing <span className="font-medium">{indexOfFirstClient + 1}</span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(indexOfLastClient, sortedClients.length)}
          </span>{" "}
          of <span className="font-medium">{sortedClients.length}</span> clients
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded-md text-sm font-medium ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 dark:border-gray-600 dark:text-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Client Management
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 dark:text-gray-300" />
            </div>
            <input
              type="text"
              placeholder="Search clients..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg w-full bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <NavLink to="/dashboard/create-client">
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <FiPlus />
              New Client
            </button>
          </NavLink>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {renderTableHeader()}
          {renderTableBody()}
        </table>
      </div>

      {renderPagination()}
    </div>
  );
};

export default ClientManagement;
