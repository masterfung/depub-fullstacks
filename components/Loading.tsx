const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div className="z-10 bg-white p-4 rounded-lg flex">
        <div className="Spinner mr-2"></div>
        <p className="text-center">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
