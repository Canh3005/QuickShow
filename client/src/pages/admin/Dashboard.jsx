import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  UsersIcon,
  StarIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import BlurCircle from "../../components/BlurCircle";
import dateFormat from "../../lib/dateFormat";

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [dashBoardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalShows: [],
    totalUser: 0,
  });
  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashBoardData.totalBookings || "0",
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: currency + dashBoardData.totalRevenue || "0",
      icon: CircleDollarSignIcon,
    },
    {
      title: "Total Shows",
      value: dashBoardData.totalShows || "0",
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashBoardData.totalUser || "0",
      icon: UsersIcon,
    },
  ];

  const fetchDashboardData = async () => {
    try {
      setDashboardData(dummyDashboardData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return !loading ? (
    <>
      <Title text1="Admin" text2="Dashboard" />
      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurCircle top="-100px" left="0" />
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="w-full md:w-1/2 lg:w-1/4 p-4 bg-primary/10 rounded-lg shadow-md flex items-center justify-between gap-2 max-w-60"
          >
            <div>
              <h3 className="text-lg">{card.title}</h3>
              <p className="text-2xl mt-2">{card.value}</p>
            </div>
            <div className="text-primary text-3xl">
              <card.icon className="w-8 h-8" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold mt-4">Active Movies</h2>
        <div className="mt-2 flex flex-wrap gap-4">
          <BlurCircle top="100px" left="-10%" />
          {dashBoardData.activeShows.map((show, index) => (
            <div
              key={index}
              className="bg-primary/10 rounded-lg shadow-md w-full md:w-1/3 lg:w-1/4 flex justify-between flex-col border border-primary/20 max-w-80 hover:-translate-y-1 transition-transform duration-300"
            >
              <img
                src={show.movie.poster_path}
                alt=""
                className="rounded-t-lg w-full h-65 object-cover"
              />
              <div className="text-xl px-4 py-2">{show.movie.title}</div>
              <div className="flex items-center justify-between px-4 pb-2 text-lg">
                <div>
                  {currency} {show.showPrice}
                </div>
                <div className="text-sm text-gray-400 flex items-center">
                  {
                    <StarIcon className="inline-block w-4 h-4 mr-1 fill-primary text-primary" />
                  }
                  {show.movie.vote_average.toFixed(1)}
                </div>
              </div>
              <div className='text-sm text-gray-400 pb-2 px-4'>{dateFormat(show.showDateTime)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;
