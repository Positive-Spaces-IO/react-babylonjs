import React, { useContext, useRef } from 'react'
import { Engine, Scene, EngineCanvasContext , SceneContext, useBeforeRender } from '../../../dist/react-babylonjs'
import { Vector3, Color3 } from '@babylonjs/core/Maths/math'
import '../../style.css'

export default { title: 'Hooks' };

const ContextLogger = (props, context) => {
  console.log('Direct access to context depending on where declared yields different results.  Using hooks directly useScene, useEngine, useCanvas is easier.');
  const ctx = useContext(EngineCanvasContext)
  console.log(`ctx-logger "${props.id}" BabylonJSContext is:`, ctx)

  const ctx2 = useContext(SceneContext)
  console.log(`ctx-logger "${props.id}" SceneContext is:`, ctx2)
  return null;
}

const RotatingBoxScene = (props) => {
  const boxRef = useRef(null);

  useBeforeRender((scene) => {
    if (boxRef.current) {
      var deltaTimeInMillis = scene.getEngine().getDeltaTime();

      const rpm = props.rpm || 10;
      boxRef.current.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000));
    }
  })

  return (
    <>
      <freeCamera name='camera1' position={new Vector3(0, 5, -10)} setTarget={[Vector3.Zero()]} />
      <hemisphericLight name='light1' intensity={0.7} direction={Vector3.Up()} />
      <box ref={boxRef} name='box1' size={2} position={new Vector3(0, 1, 0)}>
        <standardMaterial name='boxMat' diffuseColor={Color3.Red()} specularColor={Color3.Black()} />
      </box>
      <ground name='ground1' width={6} height={6} subdivisions={2} />
    </>
  )
}

const RenderHooks = (props, context) => {
  return (
    <Engine antialias adaptToDeviceRatio canvasId='babylonJS' >
      <ContextLogger id='engine' />
      <Scene>
        <ContextLogger id='scene' />
        <RotatingBoxScene rpm={20} />
      </Scene>
    </Engine>
  )
}

export const RenderHooksStory = () => (
  <div style={{ flex: 1, display: 'flex' }}>
    <RenderHooks x={5} />
  </div>
)

RenderHooksStory.story = {
  name: 'useBeforeRender'
}