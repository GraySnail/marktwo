import React, { useState, useEffect } from 'react'

import Modal from './Modal'

interface ContactOptions {}

const Contact: React.FC<ContactOptions> = (props: ContactOptions) => {
  const [visible, setVisible] = useState<boolean>(false)
  const onClick = () => {
    setVisible(true)
  }

  return (
    <React.Fragment>
      <a onClick={onClick}>Contact</a>
      <Modal
        visible={visible}
        header={'Thanks for reaching out!'}
        className="m2-contact"
        onCancle={() => setVisible(false)}
        footer={null}
      >
        <div>
          <p>
            I welcome bug reports, feature requests, questions, comments, complaints, gossip, tirades, manifestos,
            rants, and much more. I&apos;ll do my best to get back to you within two business days.
          </p>
          <br />
          <form name="m2-contact" method="post" action="/submitted">
            <input type="hidden" name="form-name" value="m2-contact" />

            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="Your name..." name="name" />
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input className="input" type="email" placeholder="your@email.com" name="email" />
              </div>
            </div>

            <div className="field">
              <label className="label">Message</label>
              <div className="control">
                <textarea className="textarea" placeholder="Your message..." name="message"></textarea>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button type="submit" className="button is-link">
                  Submit
                </button>
              </div>
              <div className="control">
                <button className="button is-text" onClick={() => setVisible(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </React.Fragment>
  )
}

export default Contact
