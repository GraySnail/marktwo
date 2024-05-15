import React, { useState, useEffect } from 'react'

import Modal from './Modal'
import coffee from '../img/coffee.png'
import me from '../img/me.jpg'

interface AboutOptions {}

const About: React.FC<AboutOptions> = (props: AboutOptions) => {
  const [visible, setVisible] = useState<boolean>(false)
  const onClick = () => {
    setVisible(true)
  }

  return (
    <React.Fragment>
      <a onClick={onClick}>About</a>
      <Modal
        visible={visible}
        header={'About'}
        className="m2-about"
        onCancle={() => setVisible(false)}
        footer={
          <React.Fragment>
            <a href="/privacy.txt" target="_blank">
              Privacy
            </a>
            <a href="/terms.txt" target="_blank">
              Terms
            </a>
            <a href="https://github.com/anthonygarvan/marktwo" target="_blank" rel="noreferrer">
              Source
            </a>
            <a
              className="m2-coffee is-pulled-right"
              href="https://www.buymeacoffee.com/GDsZofV"
              target="_blank"
              rel="noreferrer"
            >
              <img src={coffee} alt="Buy Me A Coffee" />
            </a>
          </React.Fragment>
        }
      >
        <div>
          <p>
            MarkTwo was created by me, Anthony Garvan. I&apos;m a software developer based out of Chicago. I love
            spending time with my family, working with my team, and tinkering with random projects like this one.
          </p>

          <p>
            MarkTwo is my second attempt at a markdown editor, and obviously my best. It took many months to get right,
            if you enjoy using it please consider showing your appreciation by buying me a cup of coffee ☕❤️.
          </p>
          <div className="m2-me">
            <img className="m2-profile" src={me} alt="developer" />
            <div></div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  )
}

export default About
