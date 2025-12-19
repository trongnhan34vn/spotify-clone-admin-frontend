import { useState } from 'react';
import { HashLoader } from 'react-spinners';


let showFn: any;
let hideFn: any;


const Spinner = () => {
  const [loading, setLoading] = useState(false);

  showFn = () => setLoading(true);
  hideFn = () => setLoading(false);

  if(!loading) return;

  return (
    <div className="absolute inset-0 h-full z-[9999] flex items-center backdrop-blur-sm justify-center">
      <div className="flex flex-col mb-32 items-center gap-2">
        <p className="text-white text-lg font-medium">Loading...</p>
        <HashLoader color="#1DB954" loading={true} />
      </div>
    </div>
  );
};

export default Spinner;


export const spinner = {
  show: () => showFn && showFn(),
  hide: () => hideFn && hideFn(),
};