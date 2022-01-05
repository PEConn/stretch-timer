import Head from 'next/head'
import Header from '@components/Header'
import Timer from '@components/Timer'
import { useEffect, useState } from 'react'

const stretches = [
  // Floor
  ["Yoga seated", 90, false],
  ["Hamstring", 40, true],
  ["Hip Flexor", 40, true],
  
  // Standing
  ["Calf", 40, true],
  
  // Sitting
  ["Chest", 40, true],
  ["Shoulder", 40, true],
  ["Forearms", 40, true],
  
  // Done
  ["Finished", 1, false],
];

let currentStretch = -1;
let currentSide = 0;
let currentTimeLeft = 0;

// TODO: Make all of this into a class.
function tick() {
  if (currentStretch === -1) {
    // Set up the first stretch.
    currentStretch = 0;
    currentTimeLeft = stretches[currentStretch][1];
  } else if (currentTimeLeft === 0) {
    // Are there two sides to the stretch?
    if (stretches[currentStretch][2] && currentSide === 0) {
      // Start again on the next side.
      currentSide = 1;
      currentTimeLeft = stretches[currentStretch][1];
    } else {
      // Move onto the next stretch.
      if (currentStretch < stretches.length - 1) {
        currentSide = 0;
        currentStretch += 1;
        currentTimeLeft = stretches[currentStretch][1];
      } else {
        // No more stretches to do.
        return [];
      }
    }
  } else {
    currentTimeLeft -= 1;
  }

  let name = stretches[currentStretch][0];
  if (stretches[currentStretch][2]) {
    if (currentSide === 0) {
      name = name + " (Left)";
    } else {
      name = name + " (Right)";
    }
  }

  let time = currentTimeLeft + "s";

  return [{
    name: name,
    time: time
  }];
}

export default function Home() {
  const [timerState, setTimerState] = useState({
    time: "",
    name: "Welcome",
  })

  useEffect(() => {
    let timeout = 1000;
    if (window.location.href.includes('test')) {
      timeout = 100;
    }

    // https://stackoverflow.com/questions/39426083/update-react-component-every-second
    const interval = setInterval(() => {
      let state = tick();
      
      if (state.length == 0) {
        // All done.
        return;
      }

      setTimerState(state[0]);
    }, timeout);
    return () => {
      clearInterval(interval);
    }
  });

  return (
    <div className="container">
      <Head>
        <title>Stretches</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Timer name={timerState.name} time={timerState.time} />
      </main>

    </div>
  )
}
