export default function Container({ children }) {
  return (
    <>
      <div className="bg-gray-50 w-1/3  mx-auto px-12 rounded-lg shadow-xl flex flex-col ">
        {children}
      </div>
    </>
  );
}
