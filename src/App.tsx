import { useState } from 'react';
import './App.css';
import SignIn from './pages/auth/SignIn';

function App() {
  return (
    <div className="min-h-screen w-full bg-black">
      <SignIn />
    </div>
  );
}

export default App;
