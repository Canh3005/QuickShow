import Title from "../../components/admin/Title";
import Loading from "../../components/Loading";
import { dummyShowsData } from "../../assets/assets";
import { useEffect, useState } from "react";
import BlurCircle from "../../components/BlurCircle";

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState([]);

  const fetchShows = async () => {
    try {
      setShows(dummyShowsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching shows:", error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return !loading ? (
    <>
      <Title text1="List" text2="Shows" />
      <div className="relative flex flex-wrap gap-4 mt-10">
        <div className="rounded-lg overflow-hidden max-w-[1000px] w-full">
          <BlurCircle top='-100px' left='100px' />
          <table className="bg-primary/10 border border-primary/30 rounded-lg w-full">
            <colgroup>
              <col style={{ width: "35%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <thead>
              <tr className="bg-primary/20 text-white text-center">
                <th className="px-4 py-2 text-left">Movie Name</th>
                <th className="px-4 py-2">Show Time</th>
                <th className="px-4 py-2">Total Booking</th>
                <th className="px-4 py-2">Earning</th>
              </tr>
            </thead>
            <tbody>
              {shows.map((show) => (
                <tr
                  key={show.id}
                  className="border-b border-primary/30 text-center"
                >
                  <td className="px-4 py-2 text-left">{show.title}</td>
                  <td className="px-4 py-2">{show.release_date}</td>
                  <td className="px-4 py-2">{show.total_booking || 100}</td>
                  <td className="px-4 py-2">{currency} {show.earning || 100}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListShows;
