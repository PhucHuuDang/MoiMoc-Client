export const Confirm = () => {
  return (
    // <div className="w-full">
    <div className="flex h-12 items-center justify-evenly bg-moi_moc_green p-2 font-semibold text-white">
      {Array.from({ length: 4 }).map((_, index) => {
        // console.log(index);

        return (
          <div
            // className={`md:hidden ${index < 2 ? "block" : "hidden md:block"}`}
            key={index}
          >
            100% from natural ingredients
          </div>
        );
      })}
    </div>
  );
};
