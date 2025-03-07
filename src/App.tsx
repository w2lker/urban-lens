import { useState } from 'react';
import Form from './Form/Form';
import Result from './Result';
import UserRate, { defaultUserRate } from './UserRate';

function App() {
  const [rate, setRate] = useState<UserRate>(defaultUserRate);

  return (
    <>
      <div className="app max-w-[1024px] mx-auto">
        <Form rate={rate} onChange={setRate} />
        <Result rate={rate} />
      </div>
    </>
  );
}

export default App;
