import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function Loader() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing Solar System')

  const simulateLoading = (startProgress, targetProgress, duration, text) => {
    return new Promise((resolve) => {
      let startTime = null
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const elapsedTime = currentTime - startTime
        const progressRatio = Math.min(elapsedTime / duration, 1)
        
        const currentProgress = startProgress + (targetProgress - startProgress) * progressRatio
        setProgress(Math.round(currentProgress))
        
        if (progressRatio < 1) {
          requestAnimationFrame(animate)
        } else {
          resolve(currentProgress)
        }
      }
      
      setLoadingText(text)
      requestAnimationFrame(animate)
    })
  }

  useEffect(() => {
    const loadSequence = async () => {
      const phase1 = await simulateLoading(0, 50, 2000, 'Loading Textures')
      await new Promise(resolve => setTimeout(resolve, 500))
      const phase2 = await simulateLoading(phase1, 70, 1500, 'Preparing 3D Models')
      await new Promise(resolve => setTimeout(resolve, 500))
      await simulateLoading(phase2, 100, 1000, 'Launching Solar System')
    }

    loadSequence()
  }, [])

  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loading-text">
          {loadingText}...
        </div>
        <div className="loading-percentage">
          {progress}%
        </div>
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ 
              width: `${progress}%`,
              transition: 'width 0.3s ease-out'
            }}
          />
        </div>
      </div>
    </div>
  )
}

Loader.propTypes = {
  onLoadingComplete: PropTypes.func
}

export default Loader 