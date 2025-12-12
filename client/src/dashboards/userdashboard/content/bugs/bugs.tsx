
import { bugsAPI, type TBug } from "../../../../features/bugs/bugsAPI";
import { CreateBugModal } from "./reportbug";

export default function Bugsuser() {
 

  const { data: bugsData, isLoading, error } = bugsAPI.useGetAllBugsQuery();

  // Severity → Colour Map (text is always black)
  const getSeverityColor = (severity?: string) => {
    switch ((severity || "").toLowerCase()) {
      case "critical":
        return "bg-red-700 text-black";
      case "high":
        return "bg-red-500 text-black";
      case "medium":
        return "bg-yellow-400 text-black";
      case "low":
        return "bg-green-500 text-black";
      default:
        return "bg-gray-500 text-black";
    }
  };

  // Status → Colour Map
  const getStatusColor = (status?: string) => {
    switch ((status || "").toLowerCase()) {
      case "open":
        return "bg-blue-500 text-black";
      case "in_progress":
        return "bg-yellow-400 text-black";
      case "resolved":
        return "bg-green-500 text-black";
      case "closed":
        return "bg-gray-500 text-black";
      default:
        return "bg-gray-500 text-black";
    }
  };

  return (
    <div className="p-4">
      {/* Report Bug Button */}
      <div className="flex justify-center mb-4">
        <button
          className="btn bg-green-600 text-black hover:bg-green-700 border border-green-400 rounded-lg px-4 py-2 text-lg"
          onClick={() =>
            (document.getElementById("create-bug-modal") as HTMLDialogElement)?.showModal()
          }
        >
          Report Bug
        </button>
      </div>

      {/* Modal */}
      <CreateBugModal />

      {/* Loading / Errors */}
      {isLoading && <p className="text-center text-black">Loading bugs…</p>}
      {error && <p className="text-center text-black">Error loading bugs.</p>}

      {/* Bugs Table */}
      {bugsData && bugsData.length > 0 ? (
        <div className="md:overflow-x-auto">
          <table className="table w-full bg-white border border-green-300 rounded-md shadow-md">
            <thead>
              <tr className="bg-green-700 text-black text-md lg:text-lg">
                <th className="px-4 py-3">Bug ID</th>
                <th className="px-4 py-3">Project ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Reported By</th>
                <th className="px-4 py-3">Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {bugsData.map((bug: TBug) => (
                <tr
                  key={bug.bugid}
                  className="hover:bg-green-100 border-b border-green-300 text-black"
                >
                  <td className="px-4 py-2 border-r border-green-300">{bug.bugid}</td>
                  <td className="px-4 py-2 border-r border-green-300">{bug.projectid}</td>
                  <td className="px-4 py-2 border-r border-green-300">{bug.title}</td>
                  <td className="px-4 py-2 border-r border-green-300">{bug.description || "-"}</td>
                  <td className="px-4 py-2 border-r border-green-300">
                    <span className={`badge px-2 py-1 rounded ${getSeverityColor(bug.severity)}`}>
                      {bug.severity}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-r border-green-300">
                    <span className={`badge px-2 py-1 rounded ${getStatusColor(bug.status)}`}>
                      {bug.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-r border-green-300">{bug.reported_by}</td>
                  <td className="px-4 py-2 border-r border-green-300">{bug.assigned_to || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-6 text-black">No bugs found.</p>
      )}
    </div>
  );
}
