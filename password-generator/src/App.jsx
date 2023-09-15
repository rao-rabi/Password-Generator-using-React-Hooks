import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "~`!@#$%^&*()_}{][';,.<>/?|";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword, length, numberAllowed, charAllowed]);
  
  const passowrdRef = useRef(null)

  let copyPassword = useCallback(() => {
    passowrdRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])





  return (
    <div className="flex justify-center place-items-center w-full h-screen bg-zinc-400">
      <div className="bg-teal-700 w-full max-w-lg shadow-lg rounded-lg px-4 py-3 m-auto">
        <h1 className="shadow-2xl font-sans text-xl font-bold text-white text-center mb-2">
          Password Generator
        </h1>
        <div className="flex shadow-lg rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="w-full py-2 px-2 rounded-left-lg text-teal-900 font-medium outline-none shadow-xl"
            readOnly
            placeholder="Password"
            ref={passowrdRef}
          />
          <button
            type="button"
            className="px-4 bg-teal-400 rounded-right-lg font-sans shadow-xl font-bold"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className="flex justify-between place-items-center">
          <div className="flex place-items-center gap-2">
            <input
              type="range"
              value={length}
              id="Length"
              min={6}
              max={25}
             onChange={(e) => {setLength(e.target.value)}}
            />
            <label
              className="font-sans font-bold shaodow-xl text-white"
              htmlFor="length"
            >
              Length: {length}
            </label>
          </div>
          <div className="flex place-items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numbers"
              onChange={() => {setNumberAllowed((prev) => !prev)}}
            />
            <label
              className="font-sans font-bold shaodow-xl text-white"
              htmlFor="numbers"
            >
              Number
            </label>
          </div>
          <div className="flex place-items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="chars"
              onChange={() => {setCharAllowed((prev) => !prev)}}
            />
            <label
              className="font-sans font-bold shaodow-xl text-white"
              htmlFor="chars"
            >
              Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
