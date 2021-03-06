import React, { useRef } from "react";
import { TextureLoader } from "three";
import * as THREE from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthCloudMap from "../../assets/textures/8k_earth_clouds.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthspecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthNightMap from "../../assets/textures/8k_earth_nightmap.jpg";
import { useFrame, useLoader } from "react-three-fiber";
export function Earth(props) {
  const [colormap, normalmap, specularmap, cloudmap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthspecularMap, EarthCloudMap]
  );

  const earthRef = useRef();
  const cloudsRef= useRef();
  useFrame(({clock}) =>{
    const elapsetime= clock.getElapsedTime();
    earthRef.current.rotation.y = elapsetime /6;
    cloudsRef.current.rotation.y = elapsetime/4;
  });

  return (
    <>
      {/* <ambientLight intensity={1} /> */}
      <pointLight color="#f6f3ea" position={[2,0,5.5]} intensity={1.2} />
      <Stars
        radius={300}
        depth={60}
        count={20000}
        factor={7}
        saturation={0}
        fade={true}
      ></Stars>
      <mesh ref={cloudsRef} >
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial
          map={cloudmap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh> 
      <mesh ref={earthRef} >
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial specularMap={specularmap} />
        <meshStandardMaterial map={colormap} normalMap={normalmap} metalness={0.4} roughness={0.7}/>

        <OrbitControls
          enableZoon={true}
          enableRotate={true}
          panspeed={0.5}
          zoomSpeed={0.6}
          rotateSpeed={0.4}
        />
      </mesh>
    </>
  );
}
