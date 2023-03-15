import useSWR from "swr";
import Select from "react-select";

const fetchModels = () => fetch("/api/getModels").then((res) => res.json());

const ModelSelection = () => {
  const { data, isLoading } = useSWR("models", fetchModels);
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  return (
    <div>
      <Select
        instanceId={"model-select"}
        options={data?.modelOptions}
        className="z-20 outline-none focus:ring-transparent border-none active:border-none active:ring-0 active:outline-none"
        isSearchable
        menuPosition="fixed"
        styles={{
          menuList: (baseStyles) => ({
            ...baseStyles,
            "::-webkit-scrollbar": {
              width: "1rem",
            },
            "::-webkit-scrollbar-track": {
              background: "#dedede",
              borderRadius: "0 5px 5px 0",
            },
            "::-webkit-scrollbar-thumb": {
              borderRadius: 0,
            },
          }),
        }}
        classNames={{
          control: () =>
            // "text-white z-20 focus:outline-none focus:ring-transparent",
            "border-none hover:border-none",
          input: () => "text-white",
          //   //   placeholder: () => "text-white bg-gray_light",
          //   //   singleValue: () => "text-white bg-gray_light",
          //   container: () => "bg-black",
          //   indicatorSeparator: () => "bg-dark_gray",
          //   menu: () => "bg-gray-100",
          //   valueContainer: () => "bg-black",
        }}
        // classNamePrefix="bg-gray_light text-white border-none outline-none ring-none active:outline-none focus:ring-none focus:border-none"
        placeholder={model}
        defaultValue={model}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
};

export default ModelSelection;
