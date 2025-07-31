import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

const MiniModel = ({ url }) => {
  const { scene } = useGLTF(url);

  
  scene.position.set(0, -1, 0);          
  scene.rotation.set(0, Math.PI / 4, 0);   
  scene.scale.set(1.2, 1.2, 1.2);          

  return <primitive object={scene} />;
};

export default function GLBThumbnail({ url }) {
  return (
    <div style={{ width: 50, height: 50, borderRadius: 6, overflow: "hidden" }}>
      <Canvas camera={{ position: [2, 2, 2], fov: 45 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <MiniModel url={url} />
        </Suspense>
      </Canvas>
    </div>
  );
}