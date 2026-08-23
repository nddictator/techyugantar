'use client'; // This is the magic line

import Typewriter from 'typewriter-effect';

const TypewriterWrapper = () => {
  return (
    <Typewriter
      options={{
        strings: [
          'Architecting the Digital Era.',
          'Innovative Software Solutions.',
          'Your Partner in Tech Evolution.',
        ],
        autoStart: true,
        loop: true,
        delay: 50,
        deleteSpeed: 30,
      }}
    />
  );
};

export default TypewriterWrapper;