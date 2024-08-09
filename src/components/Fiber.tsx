import {
  CameraControls,
  MeshDistortMaterial,
  OrbitControls,
  Sphere,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { useEffect, useRef, useState } from "react";

type Vector = [number, number, number];
type BlobArgs = {
  position: Vector;
  size: number;
  color: string;
};

const scene: Array<BlobArgs> = [
  {
    position: [1714.6605149762731, 153.37633079444996, 1644.302128264111],
    size: 3.479964611421588,
    color: "#121212",
  },
  {
    position: [467.8406736454073, 273.4306113752757, 844.9035527761334],
    size: 3.748011015824662,
    color: "#101010",
  },
  {
    position: [153.42962983709162, 1003.9834713349021, 777.8078709526176],
    size: 3.7384537356016936,
    color: "#141414",
  },
  {
    position: [1125.1531687493293, 62.08674902378452, 125.45243100679562],
    size: 2.6646667215245285,
    color: "#121212",
  },
  {
    position: [1762.1203561114721, 890.5328468275314, 77.9055292479674],
    size: 3.489607357849157,
    color: "#121212",
  },
  {
    position: [727.9553388045281, 307.2367587596952, 312.18165413120937],
    size: 3.4940325457840444,
    color: "#141414",
  },
  {
    position: [236.84025109922504, 1120.2913798567117, 1060.0761962956417],
    size: 2.6361744445490176,
    color: "#121212",
  },
  {
    position: [1475.1321594036576, 803.7265947998868, 1299.0380550907985],
    size: 3.662465073118027,
    color: "#312322",
  },
  {
    position: [914.7425645740831, 44.02321749083708, 927.4456985652118],
    size: 2.272733292839054,
    color: "#312322",
  },
  {
    position: [84.25341595119512, 543.2106234058657, 873.6469949396572],
    size: 2.594623640392539,
    color: "#101010",
  },
];

export const Fiber = () => {
  const screenSize = useRef({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      screenSize.current.w = window.innerWidth;
      screenSize.current.h = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen w-screen absolute -z-10">
      <Canvas camera={{ position: [-15, -12, -15], fov: 10 }}>
        <EffectComposer>
          <Noise opacity={0.2} />
        </EffectComposer>
        <spotLight
          position={[10, 10, -10]}
          angle={0.5}
          penumbra={1}
          decay={0}
          intensity={0.4}
        />
        <ambientLight intensity={Math.PI} />
        {scene.map((blob, i) => (
          <Blob
            key={i}
            position={blob.position}
            size={blob.size}
            color={blob.color}
            w={screenSize.current.w}
            h={screenSize.current.h}
          />
        ))}
        <OrbitControls
          onChange={(a) => console.log(a?.target.object.position)}
        />
      </Canvas>
    </div>
  );
};

export const Blob = (props: BlobArgs & { w: number; h: number }) => {
  const ref = useRef<any>();
  const [position, setPosition] = useState(props.position);

  useFrame(() => {
    const newPosition = position.map((p) => p + 0.001);
    setPosition(newPosition as Vector);

    ref.current.position.set(
      (newPosition[0] / props.w) * 10,
      (newPosition[1] / props.h) * 10,
      (newPosition[2] / props.w) * 10
    );

    ref.current.rotation.x += 0.004;
    ref.current.rotationyx += 0.004;
  });

  return (
    <Sphere ref={ref} args={[props.size, 32, 32]}>
      <MeshDistortMaterial
        color={props.color}
        attach="material"
        distort={0.2}
        speed={0.2}
      />
    </Sphere>
  );
};
