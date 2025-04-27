import { FiAlertCircle, FiUsers, FiLayers, FiPieChart } from "react-icons/fi";
import { useGetOverviewQuery } from "../../store/api/dashboard.api";

const Dashboard = () => {

  const { data: overviewData } = useGetOverviewQuery(1);

  const metrics = overviewData?.data;
  console.log(metrics)

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Clients
              </p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {metrics.totalClients}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <FiUsers className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Projects
              </p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {metrics.totalProjects}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <FiLayers className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Reminders Due
              </p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {metrics.remindersDue}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
              <FiAlertCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Projects by Status
            </p>
            <div className="p-2 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <FiPieChart className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-3">
            {Object.entries(metrics.projectsByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span
                    className={`w-3 h-3 rounded-full mr-2 ${
                      status === "PENDING"
                        ? "bg-yellow-500"
                        : status === "IN_PROGRESS"
                        ? "bg-blue-500"
                        : status === "COMPLETED"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {status.replace("_", " ")}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-800 dark:text-white">
                  {count as number}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
