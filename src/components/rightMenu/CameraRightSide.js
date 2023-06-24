import React from 'react'
import { Button } from 'react-bootstrap'

function CameraRightSide() {
  return (
    <div>
       <div className="mt-2 text-center pt-3">
              <Button
                variant="primary"
                className="px-5"
                style={{ marginBottom: "30px" }}
              >
                Capture
              </Button>
              <Button
                variant="primary"
                className="px-5"
                style={{ marginRight: "" }}
              >
                Record
              </Button>
              </div>
    </div>
  )
}

export default CameraRightSide
