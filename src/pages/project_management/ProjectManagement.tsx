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
import { useProjectListQuery } from "../../store/api/project.api";

// Types
type TProject = {
  id: string;
  title: string;
  budget: number;
  clientId: string;
  deadline: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
};

type SortConfig = {
  key: keyof TProject;
  direction: "ascending" | "descending";
};

// Constants
const PROJECTS_PER_PAGE = 5;

// Utility Functions
const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return "Invalid date";
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const filterProjects = (projects: TProject[], searchTerm: string) => {
  if (!searchTerm) return projects;
  return projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

const sortProjects = (projects: TProject[], sortConfig: SortConfig | null) => {
  if (!sortConfig) return [...projects];
  return [...projects].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue === undefined || bValue === undefined) return 0;
    if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
    return 0;
  });
};

const paginateProjects = (
  projects: TProject[],
  currentPage: number,
  projectsPerPage: number
) => {
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  return projects.slice(indexOfFirstProject, indexOfLastProject);
};

// Components
const StatusBadge = ({ status }: { status: TProject["status"] }) => {
  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    IN_PROGRESS: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
};

const SortableHeader = ({
  field,
  label,
  sortConfig,
  onSort,
}: {
  field: keyof TProject;
  label: string;
  sortConfig: SortConfig | null;
  onSort: (key: keyof TProject) => void;
}) => (
  <th
    scope="col"
    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
    onClick={() => onSort(field)}
  >
    <div className="flex items-center">
      {label}
      {sortConfig?.key === field && (
        sortConfig.direction === "ascending" ? (
          <FiChevronUp className="ml-1" />
        ) : (
          <FiChevronDown className="ml-1" />
        )
      )}
    </div>
  </th>
);

const ActionButtons = () => (
  <>
    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-500 mr-4">
      <FiEdit2 />
    </button>
    <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-500">
      <FiTrash2 />
    </button>
  </>
);

const PageHeader = ({
  searchTerm,
  onSearchChange,
}: {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Project Management</h2>
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <div className="relative flex-grow max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400 dark:text-gray-300" />
        </div>
        <input
          type="text"
          placeholder="Search projects..."
          className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg w-full bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-white"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <NavLink to="/dashboard/create-project">
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <FiPlus />
          New Project
        </button>
      </NavLink>
    </div>
  </div>
);

const TableHeader = ({
  sortConfig,
  onSort,
}: {
  sortConfig: SortConfig | null;
  onSort: (key: keyof TProject) => void;
}) => (
  <thead className="bg-gray-50 dark:bg-gray-700">
    <tr>
      {["title", "budget", "deadline", "status"].map((key) => (
        <SortableHeader
          key={key}
          field={key as keyof TProject}
          label={key.charAt(0).toUpperCase() + key.slice(1)}
          sortConfig={sortConfig}
          onSort={onSort}
        />
      ))}
      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
        Actions
      </th>
    </tr>
  </thead>
);

const ProjectRow = ({ project }: { project: TProject }) => (
  <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="font-medium text-gray-900 dark:text-white">{project.title}</div>
      <div className="text-sm text-gray-500 dark:text-gray-300">Client ID: {project.clientId}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
      {formatCurrency(project.budget)}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
      {formatDate(project.deadline)}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <StatusBadge status={project.status} />
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <ActionButtons />
    </td>
  </tr>
);

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  itemCount,
  itemsPerPage,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemCount: number;
  itemsPerPage: number;
}) => {
  const firstItem = (currentPage - 1) * itemsPerPage + 1;
  const lastItem = Math.min(currentPage * itemsPerPage, itemCount);

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-500 dark:text-gray-300">
        Showing <span className="font-medium">{firstItem}</span> to{" "}
        <span className="font-medium">{lastItem}</span> of{" "}
        <span className="font-medium">{itemCount}</span> projects
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
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
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Main Component
const ProjectManagement = () => {
  // Data Fetching
  const { data: projectList } = useProjectListQuery(1);
  const projects = projectList?.data || [];

  // State Management
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Derived State
  const filteredProjects = filterProjects(projects, searchTerm);
  const sortedProjects = sortProjects(filteredProjects, sortConfig);
  const paginatedProjects = paginateProjects(sortedProjects, currentPage, PROJECTS_PER_PAGE);
  const totalPages = Math.ceil(sortedProjects.length / PROJECTS_PER_PAGE);

  // Handlers
  const handleSortRequest = (key: keyof TProject) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <PageHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <TableHeader 
            sortConfig={sortConfig}
            onSort={handleSortRequest}
          />
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedProjects.length > 0 ? (
              paginatedProjects.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-300">
                  No projects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemCount={sortedProjects.length}
          itemsPerPage={PROJECTS_PER_PAGE}
        />
      )}
    </div>
  );
};

export default ProjectManagement;