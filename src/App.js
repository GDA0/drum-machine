import { useState, useEffect } from 'react'
import './App.css'

const drumPads = [
  {
    name: 'Heater 1',
    keyTrigger: 'Q',
    soundSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    name: 'Heater 2',
    keyTrigger: 'W',
    soundSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    name: 'Heater 3',
    keyTrigger: 'E',
    soundSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    name: 'Heater 4',
    keyTrigger: 'A',
    soundSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    name: 'Clap',
    keyTrigger: 'S',
    soundSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    name: 'Open HH',
    keyTrigger: 'D',
    soundSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    name: "Kick n' Hat",
    keyTrigger: 'Z',
    soundSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    name: 'Kick',
    keyTrigger: 'X',
    soundSrc: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    name: 'Closed HH',
    keyTrigger: 'C',
    soundSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
]

function App () {
  const [displayText, setDisplayText] = useState('Drum Machine')

  const playSound = (id, name) => {
    const audioElement = document.getElementById(id)
    if (audioElement) {
      audioElement.currentTime = 0
      audioElement.play()
    }
    setDisplayText(name)
  }

  useEffect(() => {
    function handleKeyDown (event) {
      const keyTrigger = event.key.toUpperCase()
      const drumPad = drumPads.find(
        (pad) => pad.keyTrigger === keyTrigger
      )
      if (drumPad) {
        playSound(drumPad.keyTrigger, drumPad.name)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className='bg-light d-flex flex-column min-vh-100'>
      <header>
        <nav className='navbar bg-body-tertiary border-bottom border-2'>
          <div className='container-fluid'>
            <span className='navbar-brand mb-0 h1 fw-bold fs-3 mx-auto'>
              Drum Machine
            </span>
          </div>
        </nav>
      </header>
      <main className='flex-grow-1'>
        <div
          className='container bg-white rounded shadow-sm mt-5 d-flex flex-column p-3 gap-3'
          id='drum-machine'
          style={{ maxWidth: '300px', minHeight: '50vh' }}
        >
          <div
            className='bg-light rounded d-flex align-items-center justify-content-center fs-4'
            id='display'
            style={{ minHeight: '10vh' }}
          >
            {displayText}
          </div>
          <div className='drum-pads p-1'>
            {drumPads.map((drumPad) => (
              <button
                key={drumPad.name}
                onClick={() =>
								  playSound(drumPad.keyTrigger, drumPad.name)}
                className='drum-pad btn rounded shadow-sm fs-4'
                id={drumPad.name}
              >
                {drumPad.keyTrigger}
                <audio
                  src={drumPad.soundSrc}
                  className='clip'
                  id={drumPad.keyTrigger}
                />
              </button>
            ))}
          </div>
        </div>
      </main>
      <footer className='container text-center fw-medium text-secondary mt-auto'>
        <p>
          &copy; {new Date().getFullYear()} Drum Machine. Created By{' '}
          <a
            className='text-primary'
            href='https://github.com/GDA0'
            target='_blank'
            rel='noopener noreferrer'
          >
            Gideon D. Adeti
          </a>
          . All Rights Reserved.
        </p>
      </footer>
    </div>
  )
}

export default App
