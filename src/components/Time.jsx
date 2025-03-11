import TimeCard from "./TimeCard";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar";


moment.locale("ar");

export default function Time() {
 
    const [timeAndDay ,setTimeAndDay]=useState("")

    
    const [prayerTimes, setPrayerTimes] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: " ",
  });

  const [Selectedcity, setelecteCity] = useState({
    name: "مكة المكرمة",
    apiName:"Makkah"
  });

  const cities = [
    {
        id:"1",
      apiName: "Makkah",
      name: "مكة المكرمة",
    },
    {
        id:"2",
      apiName: "Madinah",
      name: "المدينة المنورة",
    },
    {      id:"3",
        apiName: "Riyadh", 
        name: "الرياض" },
    {
        id:"4",
      apiName: "Dammam",
      name: "الدمام",
    },
  ];

  const getTiming = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=SA&city=${Selectedcity.apiName}`
    );
    setPrayerTimes(response.data.data.timings);
  };



  const handleSelectedCityChange = (event) => {
    // console.log(event.target.value);
    // cities.map((city)=>{
    //     if(event.target.value===city.apiName)
    //         console.log("Hello from if")
    //     setelecteCity(city.name)
    // })
    
    const cityObj= cities.find((city)=>{
        return city.apiName==event.target.value
    })

    setelecteCity(cityObj)
    
  };

  useEffect(() => {

    getTiming();
    const t =  moment()
    setTimeAndDay(t.format("MMM Do Y | h:mm"))
    console.log("The time is " ,t.format("Y"))

  }, [Selectedcity]);

  const [dateAndTime, setDateAndTime] = useState("");

  return (
    <div className="flex flex-col ">
      <div className="flex flex-row justify-between items-center gap-4   max-[650px]:flex-col  max-[650px]:gap-8">
        <div className="flex flex-row  justify-start gap-4 items-end">
          <h1 className="text-large text font-display text-[#d4a373] max-[650px]:text-medium">
            {Selectedcity.name}
          </h1>
          <p className="text-tiny font-display  text-[#d4a373]  max-[650px]:text-[1rem]">
           {timeAndDay}
          </p>
        </div>
        <div className="border-[#d4a373] ">
          <select
            onChange={handleSelectedCityChange}
            className="border-2 border-[#d4a373] rounded-xl font-display px-2"
          >
           {cities.map((city)=>{
            return  <option value={city.apiName} key={city.id}>{city.name} </option>
           })} 
            {/* <option value={"Riyadh"}>الرياض</option>
            <option value={"Makkah"}>مكة المكرمة</option>
            <option value={"Madinah"}> المدينة المنورة </option>
            <option value={"Dammam"}> الدمام</option> */}
          </select>
        </div>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center items-center gap-4 py-10">
        <TimeCard name="الفجر" time={prayerTimes.Fajr} />
        <TimeCard name="الظهر" time={prayerTimes.Dhuhr} />
        <TimeCard name="العصر" time={prayerTimes.Asr} />
        <TimeCard name="المغرب" time={prayerTimes.Maghrib} />
        <TimeCard name="العشاء" time={prayerTimes.Isha} />
      </div>
    </div>
  );
}
