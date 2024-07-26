const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="h-full bg-main_background_color">{children}</div>;
};

export default HomeLayout;
