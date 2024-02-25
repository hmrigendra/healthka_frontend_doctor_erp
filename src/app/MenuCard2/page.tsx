import { SearchBar } from "../(Components)/HeaderComponents/SearchBar";
import { Nav } from "../(Components)/Nav";
import { TableManual } from "../(Components)/TableComponents/TableManual";
import { TableManual2 } from "../(Components)/TableComponents/TableManual2";

//need to find a better way to change things in menu card

//do watch react and next videos for more practice
export default function Table2() {
  return (
    <div className="flex ">
      <Nav />
      <div className="flex flex-col w-full min-h-screen ">
        <div className="w-full p-4">
          <div>
            <SearchBar placeholder="somedata" />
            <div className="p-6">
              <div className="bg-production-indigo mt-5 flex items-center rounded-lg justify-between ">
                <h1 className="pl-4 font-bold text-lg">Records List</h1>
                {/* <div className="pr-4">
                  <button className="bg-indigo-100 hover:bg-white rounded-md pl-2 pr-2 m-2">
                    Today
                  </button>
                  <button className="bg-indigo-100 hover:bg-white rounded-md pl-2 pr-2 m-2">
                    Last Week
                  </button>
                  <button className="bg-indigo-100 hover:bg-white rounded-md pl-2 pr-2 m-2">
                    Last Month
                  </button>
                </div> */}
              </div>
              <TableManual2
                header1="Prescription_id"
                header2="Patient name"
                header3="Phone number"
                header4="created_at"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
