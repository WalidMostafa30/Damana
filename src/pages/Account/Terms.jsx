const Terms = () => {
  return (
    <>
      <h3 className="text-lg lg:text-2xl text-primary font-bold mb-6">
        الشروط والاحكام الخاصه بضمانة
      </h3>

      <div
        className="htmlContent line-clamp-6"
        dangerouslySetInnerHTML={{ __html: "" }}
      />
    </>
  );
};

export default Terms;
