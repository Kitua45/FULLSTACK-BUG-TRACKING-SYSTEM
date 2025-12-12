import { useGetProjectsQuery } from "../../features/projects/projectAPI";
import { useGetAllBugsQuery } from "../../features/bugs/bugsAPI";
import { useGetAllCommentsQuery } from "../../features/commentsAPI/commentAPI";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  // Fetch data
  const { data: projects = [], isLoading: projectsLoading } = useGetProjectsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 5000,
  });

  const { data: bugs = [], isLoading: bugsLoading } = useGetAllBugsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 5000,
  });

  const { data: comments = [], isLoading: commentsLoading } = useGetAllCommentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 5000,
  });

  if (projectsLoading || bugsLoading || commentsLoading) {
    return <p className="text-center text-black">Loading analytics...</p>;
  }

  // Graph Data
  const barData = [
    { name: "Projects", count: projects.length },
    { name: "Bugs", count: bugs.length },
    { name: "Comments", count: comments.length },
  ];

  const pieData = [
    { name: "Projects", value: projects.length },
    { name: "Bugs", value: bugs.length },
    { name: "Comments", value: comments.length },
  ];

  // Colors: Green, Purple, Pink
  const COLORS = ["#148C0F", "#6A0DAD", "#FF69B4"];

  return (
    <div className="space-y-8">

      {/* Summary Cards - MATCHING GRAPH COLORS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Projects - Green */}
        <div className="p-6 rounded-lg shadow-md text-center"
          style={{ backgroundColor: "#148C0F" }}>
          <h3 className="text-xl font-semibold mb-2 text-white">Total Projects</h3>
          <p className="text-3xl font-bold text-white">{projects.length}</p>
        </div>

        {/* Bugs - Purple */}
        <div className="p-6 rounded-lg shadow-md text-center"
          style={{ backgroundColor: "#6A0DAD" }}>
          <h3 className="text-xl font-semibold mb-2 text-white">Total Bugs</h3>
          <p className="text-3xl font-bold text-white">{bugs.length}</p>
        </div>

        {/* Comments - Pink */}
        <div className="p-6 rounded-lg shadow-md text-center"
          style={{ backgroundColor: "#FF69B4" }}>
          <h3 className="text-xl font-semibold mb-2 text-white">Total Comments</h3>
          <p className="text-3xl font-bold text-white">{comments.length}</p>
        </div>

      </div>

      {/* Row: Bar Chart (Left) + Pie Chart (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-black">Overview Bar Chart</h3>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count">
                <Cell fill="#148C0F" />  {/* Projects */}
                <Cell fill="#6A0DAD" />  {/* Bugs */}
                <Cell fill="#FF69B4" />  {/* Comments */}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-black">Distribution Pie Chart</h3>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
