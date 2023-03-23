import Blinker from "./Blinker";
import OpenAi from "./icons/OpenAi";

const MessageReplacement = () => {
  return (
    <div className="w-full flex justify-center bg-gray_light_message">
      <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto text-gray-100 grow items-center">
        <div className="h-[30px] w-[30px] min-w-[30px] bg-green flex items-center justify-center rounded-sm">
          <OpenAi />
        </div>
        <Blinker />
      </div>
    </div>
  );
};

export default MessageReplacement;
