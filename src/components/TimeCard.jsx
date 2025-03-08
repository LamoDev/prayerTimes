

const prayers=[
  { name: "الفجر", time: "4:50" },
  { name: "الظهر", time: "12:30" },
  { name: "العصر", time: "3:45" },
  { name: "المغرب", time: "6:15" },
  { name: "العشاء", time: "8:00" },
  
]

export default function TimeCard() {
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center items-center gap-4 py-10">
      {prayers.map((prayer, index) => (
        <div key={index} className="bg-[#faedcd] w-full max-w-[250px] h-50 rounded-xl shadow-xl flex flex-col justify hover:bg-[#fefae0] text-tiny">
          <div className="bg-[#a98467] py-3 text-center rounded-t-xl">
            <h1 className="font-display text-lg text-black">{prayer.name}</h1>
          </div>
          <div className="flex justify-center items-center text-center mt-10">
            <h1 className="font-display text-medium">{prayer.time}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}

