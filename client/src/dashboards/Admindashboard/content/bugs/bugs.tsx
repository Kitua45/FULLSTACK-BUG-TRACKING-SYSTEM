
import { bugsAPI, type TBug } from "../../../../features/bugs/bugsAPI";

export default function Bugs() {
  const { data: bugsData, isLoading, error } = bugsAPI.useGetAllBugsQuery();

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-800 mb-4">All Bugs</h2>

      {isLoading && <p>Loading bugs...</p>}
      {error && <p className="text-red-500">Error fetching bugs</p>}

      {bugsData && bugsData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-xs w-full border border-green-400">
            <thead>
              <tr className="bg-green-600 text-white text-md lg:text-lg">
                <th className="px-4 py-2">Bug ID</th>
                <th className="px-4 py-2">Project ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Severity</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Reported By</th>
                <th className="px-4 py-2">Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {bugsData.map((bug: TBug) => (
                <tr
                  key={bug.bugid}
                  className="hover:bg-green-100 border-b border-green-400 text-black"
                >
                  <td className="px-4 py-2 border-r border-green-400">{bug.bugid}</td>
                  <td className="px-4 py-2 border-r border-green-400">{bug.projectid}</td>
                  <td className="px-4 py-2 border-r border-green-400">{bug.title}</td>
                  <td className="px-4 py-2 border-r border-green-400">{bug.description}</td>
                  <td className="px-4 py-2 border-r border-green-400">{bug.severity}</td>
                  <td className="px-4 py-2 border-r border-green-400">{bug.status}</td>
                  <td className="px-4 py-2 border-r border-green-400">{bug.reported_by}</td>
                  <td className="px-4 py-2 border-r border-green-400">{bug.assigned_to || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No bugs found.</p>
      )}
    </div>
  );
}
