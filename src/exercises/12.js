import React, {Suspense, useState} from 'react'

const Tilt = React.lazy(() => import('../tilt'))

function App() {
  const [showTilt, setShowTilt] = useState()
  return (
    <div>
      <label>
        <input
          type="checkbox"
          value={showTilt}
          onChange={e => setShowTilt(e.target.checked)}
        />
        {' show tilt'}
      </label>
      <div>
        {/* 🐨 4. Add a Suspense element here with a fallback="loading..." prop */}
        <Suspense fallback="loading...">
          {showTilt ? (
            <div className="totally-centered">
              <Tilt>
                <div className="totally-centered">vanilla-tilt.js</div>
              </Tilt>
            </div>
          ) : null}
          {/* close Suspense... then checkout the network tab when you check the box! */}
        </Suspense>
      </div>
    </div>
  )
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.

function Usage() {
  return <App />
}
Usage.title = 'VanillaTilt: React.lazy'

export default Usage
