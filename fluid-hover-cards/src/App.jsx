const imageIds = [
  "1706982294133-b22b5377f7d1",
  "1706828265498-2b8bda2bc833",
  "1706835462196-d008cfbc805d",
  "1706636604979-5014cfb76625",
];

const cardTitle = [
  "35mm Analog",
  "Streets of Napoli",
  "Staten Island Ferry",
  "Metropolitan Milan",
];

const cardDescription = [
  "Curious about 35mm photograph of a house for a indie movie?",
  "How about emotions of the streets of Napoli?",
  "Or you wanna feel the scenes from ferry of Staten Island?",
  "Tell us and we will stroll on the streets of Milan.",
];

function App() {
  return (
    <div className="font-body grid min-h-screen place-items-center bg-gray-200">
      <ul className="flex w-full max-w-6xl gap-4">
        {Array.from(Array(4).keys()).map((_, index) => (
          <li
            key={index}
            class="group relative h-[500px] w-full flex-1 overflow-hidden rounded-2xl transition-all hover:grow-[1.25]"
          >
            <img
              src={`https://images.unsplash.com/photo-${imageIds[index]}?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlicmFudHxlbnwwfHwwfHx8MA%3D%3D`}
              alt="Unsplash images"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 from-50% p-4">
              <h2 className="font-serif text-2xl font-bold leading-tight text-white">
                {cardTitle[index]}
              </h2>
              <div className="grid grid-rows-[0fr] transition-all group-hover:grid-rows-[1fr]">
                <p className="mt-2 overflow-hidden text-white/70 opacity-0 transition duration-300 group-hover:opacity-100">
                  {cardDescription[index]}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
