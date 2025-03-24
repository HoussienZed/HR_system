const Section = ({ children, className, bgColor = "bg-tertiary" }) => {
  return (
    <section className={`container ${className} ${bgColor}`}>
      {children}
    </section>
  );
};
export default Section;
