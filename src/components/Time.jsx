import TimeCard from "./TimeCard";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar";

moment.locale("ar");

export default function Time() {
  const [timeAndDay, setTimeAndDay] = useState("");

  const [remainingTime , setRemainingTime]=useState("")
  const [dateAndTime, setDateAndTime] = useState("");
  const [nextPrayerIndex , setNextPrayerIndex]=useState(2);
  const [prayerTimes, setPrayerTimes] = useState({
    Fajr: "04:20",
    Dhuhr: "11:50",
    Asr: "15:18",
    Sunset: "18:03",
    Isha: "19:33",
  });

  const prayersArray = [
    {key:"Fajr", displayName:"الفجر", },
    { key:"Dhuhr", displayName:"الظهر", },
    { key:"Asr", displayName:"العصر",  },
    { key:"Sunset", displayName:"المغرب",},
    { key:"Isha",  displayName:"العشاء"  },
  ];

  const [Selectedcity, setelecteCity] = useState({
    name: "مكة المكرمة",
    apiName: "Makkah",
  });

  const cities = [
    {
      id: "1",
      apiName: "Makkah",
      name: "مكة المكرمة",
    },
    {
      id: "2",
      apiName: "Madinah",
      name: "المدينة المنورة",
    },
    { id: "3", apiName: "Riyadh", name: "الرياض" },
    {
      id: "4",
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
  const setUpCountDownTimer = () => {
    // Current time
    const momentNow = moment();

    const Isha = prayerTimes["Isha"];
        
    // Should converts timings from string to moment Obj
    const IshaMoment = moment(Isha, "hh:mm");
    console.log(momentNow.isAfter(Isha));

    let prayerNumber = 2;

    if (
      momentNow.isAfter(moment(prayerTimes["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(prayerTimes["Dhuhr"], "hh:mm"))
    ) {
        console.log("Next Prayer is Dhuhr")
        prayerNumber= 1 ;
    } else if (
      momentNow.isAfter(moment(prayerTimes["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(prayerTimes["Asr"], "hh:mm"))
          ){   
      console.log("Next Prayer is Asr")
      prayerNumber= 2 ;


    } else if (
      momentNow.isAfter(moment(prayerTimes["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(prayerTimes["Sunset"], "hh:mm"))
      
      
    ) {
      console.log("Next Prayer is Maghrib")
      prayerNumber= 3 ;


    } else if (
      momentNow.isAfter(moment(prayerTimes["Sunset"], "hh:mm")) &&
      momentNow.isBefore(moment(prayerTimes["Isha"], "hh:mm"))
    ) {
      prayerNumber= 4 ;
      console.log("Next prayer is Isha ");
    }  else  {
     prayerNumber= 0 ;
     console.log("Next prayer is Fajr ");
      
    }
    
    
    setNextPrayerIndex(prayerNumber);

    // set the next prayer timer 

    const nextPrayerObj=prayersArray[nextPrayerIndex];
    const nextPrayerTime=prayerTimes[nextPrayerObj.key]

    // Has a delay of 3 mins !!!!!
    console.log(nextPrayerTime);

    let remaininTime=moment(nextPrayerTime, "hh:mm").diff(momentNow)
    console.log(remaininTime)


    const durationRemainingTime=moment.duration(remaininTime)
    
    setRemainingTime(` ${durationRemainingTime.seconds()}: ${durationRemainingTime.minutes()} :  ${durationRemainingTime.hours()}  `)


    // Need a review 
    if (remaininTime <0){
        // diff between current time and midnight
        const midnightDiff=moment("23:59:59", "hh:mm:ss").diff(momentNow);
        

        const nextPrayerTimeMoment=moment(nextPrayerTime , "hh:mm");
        const fajrToMidnightDiff=nextPrayerTimeMoment.diff(moment("00:00:00", "hh:mm:ss"))
    // diff midnight and fajr

    
        const totalDiffernce = midnightDiff+fajrToMidnightDiff

        remaininTime=totalDiffernce;


    }

  };

  const handleSelectedCityChange = (event) => {
    const cityObj = cities.find((city) => {
      return city.apiName == event.target.value;
    });

    setelecteCity(cityObj);
  };

  useEffect(() => {
    getTiming();
  }, [Selectedcity]);

  useEffect(() => {
    const t = moment();
    setTimeAndDay(t.format("MMM Do Y | h:mm"));
    console.log("The time is ", t.format("Y"));

    let interval = setInterval(() => {
      console.log("Calling timer");
      setUpCountDownTimer();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [prayerTimes]);



  return (
    <div className="flex flex-col ">
      <div className="flex flex-row justify-between items-center gap-4   max-[650px]:flex-col  max-[650px]:gap-8 ">
            <div className="flex flex-col">
            <h1 className="text-large text font-display text-[#d4a373] max-[650px]:text-medium">
           {Selectedcity.name}
          </h1>
          <p className="text-tiny font-display  text-[#d4a373]  max-[650px]:text-[1rem]">
            {timeAndDay}
          </p>
            </div> 
       
        <div className="flex flex-col ">
        <div className="flex flex-row gap-4">
        <p className="text-tiny font-display  text-[#d4a373]  max-[650px]:text-[1rem] max-[350px]:text-[0.8rem]">
           متبقي حتى صلاه {prayersArray[nextPrayerIndex].displayName}
          </p>
          <p className="text-tiny font-display  text-[#d4a373]  max-[650px]:text-[1rem] max-[350px]:text-[0.8rem]">
            {remainingTime}
          </p>
        </div>
        
          <div className="border-[#d4a373] mt-5 max-[350px]:mt-3">
          <select
            onChange={handleSelectedCityChange}
            className="border-2 border-[#d4a373] rounded-xl font-display px-2"
          >
            {cities.map((city) => {
              return (
                <option value={city.apiName} key={city.id}>
                  {city.name}{" "}
                </option>
              );
            })}
          </select>
        </div>

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
