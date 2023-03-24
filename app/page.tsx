import InfoBlock from "../components/InfoBlock";
import { SunIcon } from "@heroicons/react/24/outline";

const Home = () => (
  <div className="w-full flex flex-col px-6 text-gray-100 items-center justify-center">
    <div className="flex flex-col md:grow justify-center items-center">
      <h1 className="text-4xl font-semibold pb-10 pt-20 md:pt-10">ChatGPT</h1>
      <div className="md:flex text-center gap-3.5 md:max-w-2xl lg:max-w-3xl w-full">
        <div className="flex flex-col items-center w-full">
          <div className="flex md:flex-col items-center mb-5 justify-center gap-2">
            <SunIcon className="h-7 w-7" />
            <h2>Examples</h2>
          </div>
          <ul className="flex flex-col gap-3.5 w-full m-auto sm:max-w-md">
            <InfoBlock text="Who are you? dfsfdsf dsf sdfsdf dsf df dfdfddsf " />
            <InfoBlock text="Who are you?" />
            <InfoBlock text="Who are you?" />
          </ul>
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="flex md:flex-col items-center mb-5 justify-center gap-2">
            <SunIcon className="h-7 w-7" />
            <h2>Examples</h2>
          </div>
          <ul className="flex flex-col gap-3.5 w-full m-auto sm:max-w-md">
            <InfoBlock text="Who are you? dfsfdsf dsf sdfsdf dsf df dfdfddsf " />
            <InfoBlock text="Who are you?" />
            <InfoBlock text="Who are you?" />
          </ul>
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="flex md:flex-col items-center mb-5 justify-center gap-2">
            <SunIcon className="h-7 w-7" />
            <h2>Examples</h2>
          </div>
          <ul className="flex flex-col gap-3.5 w-full m-auto sm:max-w-md">
            <InfoBlock text="Who are you? dfsfdsf dsf sdfsdf dsf df dfdfddsf " />
            <InfoBlock text="Who are you?" />
            <InfoBlock text="Who are you?" />
          </ul>
        </div>
      </div>
    </div>

    {/* <ChatInput /> */}
  </div>
);

export default Home;
