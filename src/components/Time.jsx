import TimeCard from "./TimeCard";

export default function Time() {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-row justify-between items-center gap-4   max-[650px]:flex-col  max-[650px]:gap-8">
        <div className="flex flex-row  justify-start gap-4 items-end">
          <h1 className="text-large text font-display text-[#d4a373] max-[650px]:text-medium">
            الرياض
          </h1>
          <p className="text-tiny font-display  text-[#d4a373]  max-[650px]:text-[1rem]">
         
            1447 هجري 6 رمضان{" "}
          </p>
        </div>
        <div className="border-[#d4a373] ">
        <select className="border-2 border-[#d4a373] rounded-xl font-display px-2">
          <option value="someOption">الرياض </option>
          <option value="otherOption">مكة المكرمة</option> 
        </select>
        </div>
       
      </div>

      <TimeCard />
    </div>
  );
}
