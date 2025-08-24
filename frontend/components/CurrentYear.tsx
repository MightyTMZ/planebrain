const CurrentYear = () => {
  const currentYear = new Date().getFullYear();

  return <span>{currentYear}</span>;
};

export default CurrentYear;
