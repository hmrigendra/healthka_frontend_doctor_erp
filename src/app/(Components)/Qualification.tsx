import { Box, FormControlLabel, Switch } from "@mui/material";
export function Qualification() {
  return (
    <div className="m-2">
      <div>
        <p>Qualification</p>
      </div>
      <div className="flex m-3">
        <input
          type="text"
          className="w-2/6 p-2 bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
          name=""
          id=""
          placeholder="Degree"
        />
        <input
          type="text"
          className="w-2/6 bg-red-200 rounded-lg mr-10 placeholder:text-gray-500 p-2"
          placeholder="College name"
        />
      </div>
      <div className="flex m-3">
        <input
          type="text"
          className="w-2/6 p-2 bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
          placeholder="Specialization"
        />
        <span className="items-center flex text-sm m-1 justify-center">
          Year of pass
        </span>
        <input
          type="date"
          className="w-[10%] p-2  border-2 mr-3 bg-red-200 rounded-lg  placeholder:text-gray-500"
          name=""
          id=""
          placeholder="Year of pass"
        />

        <input
          type="text"
          className="w-[16%] p-2 bg-red-200 rounded-lg mr-10 placeholder:text-gray-500"
          placeholder="Years of experience"
        />
      </div>
      <Box>
        <FormControlLabel label="Do you own a clinic" control={<Switch />} />
      </Box>
    </div>
  );
}
