import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { Waves, DotGrid, DotOrbit, Spiral } from "@paper-design/shaders-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "./lib/utils";

// ─── Shader param types ───────────────────────────────────────────────────────

type WavesParams = {
  type: "waves";
  scale: number;
  rotation: number;
  frequency: number;
  amplitude: number;
  spacing: number;
  proportion: number;
  softness: number;
  shape: number;
  colorBack: string;
  colorFront: string;
  style: React.CSSProperties;
};

type DotGridParams = {
  type: "dotgrid";
  size: number;
  gapY: number;
  gapX: number;
  strokeWidth: number;
  sizeRange: number;
  opacityRange: number;
  shape: "circle" | "square" | "diamond";
  colorFill: string;
  colorStroke: string;
  colorBack: string;
  style: React.CSSProperties;
};

type DotOrbitParams = {
  type: "dotorbit";
  scale: number;
  size: number;
  sizeRange: number;
  spreading: number;
  speed: number;
  stepsPerColor: number;
  frame: number;
  colors: string[];
  colorBack: string;
  style: React.CSSProperties;
};

type SpiralParams = {
  type: "spiral";
  speed: number;
  density: number;
  distortion: number;
  strokeWidth: number;
  strokeTaper: number;
  strokeCap: number;
  noiseFrequency: number;
  noise: number;
  scale: number;
  rotation: number;
  softness: number;
  offsetX: number;
  offsetY: number;
  frame: number;
  colorBack: string;
  colorFront: string;
  style: React.CSSProperties;
};

type ShaderParams = WavesParams | DotGridParams | DotOrbitParams | SpiralParams;

// ─── Card type ────────────────────────────────────────────────────────────────

type Card = {
  title: string;
  description: string;
  shader: {
    idle: ShaderParams;
    active: ShaderParams;
  };
  className: string;
  textColor: string;
  config: {
    y: number;
    x: number;
    rotate: number;
    zIndex: number;
  };
};

// ─── Animated shader components ───────────────────────────────────────────────

const SPRING = { stiffness: 300, damping: 30 };

function AnimatedWaves({
  idle,
  active,
  isActive,
}: {
  idle: WavesParams;
  active: WavesParams;
  isActive: boolean;
}) {
  const scaleSpring = useSpring(idle.scale, SPRING);
  const rotationSpring = useSpring(idle.rotation, SPRING);
  const frequencySpring = useSpring(idle.frequency, SPRING);
  const amplitudeSpring = useSpring(idle.amplitude, SPRING);
  const spacingSpring = useSpring(idle.spacing, SPRING);
  const proportionSpring = useSpring(idle.proportion, SPRING);
  const softnessSpring = useSpring(idle.softness, SPRING);
  const shapeSpring = useSpring(idle.shape, SPRING);

  const [scale, setScale] = useState(idle.scale);
  const [rotation, setRotation] = useState(idle.rotation);
  const [frequency, setFrequency] = useState(idle.frequency);
  const [amplitude, setAmplitude] = useState(idle.amplitude);
  const [spacing, setSpacing] = useState(idle.spacing);
  const [proportion, setProportion] = useState(idle.proportion);
  const [softness, setSoftness] = useState(idle.softness);
  const [shape, setShape] = useState(idle.shape);

  useMotionValueEvent(scaleSpring, "change", setScale);
  useMotionValueEvent(rotationSpring, "change", setRotation);
  useMotionValueEvent(frequencySpring, "change", setFrequency);
  useMotionValueEvent(amplitudeSpring, "change", setAmplitude);
  useMotionValueEvent(spacingSpring, "change", setSpacing);
  useMotionValueEvent(proportionSpring, "change", setProportion);
  useMotionValueEvent(softnessSpring, "change", setSoftness);
  useMotionValueEvent(shapeSpring, "change", setShape);

  useEffect(() => {
    scaleSpring.set(isActive ? active.scale : idle.scale);
    rotationSpring.set(isActive ? active.rotation : idle.rotation);
    frequencySpring.set(isActive ? active.frequency : idle.frequency);
    amplitudeSpring.set(isActive ? active.amplitude : idle.amplitude);
    spacingSpring.set(isActive ? active.spacing : idle.spacing);
    proportionSpring.set(isActive ? active.proportion : idle.proportion);
    softnessSpring.set(isActive ? active.softness : idle.softness);
    shapeSpring.set(isActive ? active.shape : idle.shape);
  }, [isActive]);

  return (
    <Waves
      scale={scale}
      rotation={rotation}
      frequency={frequency}
      amplitude={amplitude}
      spacing={spacing}
      proportion={proportion}
      softness={softness}
      shape={shape}
      colorBack={idle.colorBack}
      colorFront={idle.colorFront}
      style={idle.style}
    />
  );
}

function AnimatedDotGrid({
  idle,
  active,
  isActive,
}: {
  idle: DotGridParams;
  active: DotGridParams;
  isActive: boolean;
}) {
  const sizeSpring = useSpring(idle.size, SPRING);
  const gapYSpring = useSpring(idle.gapY, SPRING);
  const gapXSpring = useSpring(idle.gapX, SPRING);
  const strokeWidthSpring = useSpring(idle.strokeWidth, SPRING);
  const sizeRangeSpring = useSpring(idle.sizeRange, SPRING);
  const opacityRangeSpring = useSpring(idle.opacityRange, SPRING);

  const [size, setSize] = useState(idle.size);
  const [gapY, setGapY] = useState(idle.gapY);
  const [gapX, setGapX] = useState(idle.gapX);
  const [strokeWidth, setStrokeWidth] = useState(idle.strokeWidth);
  const [sizeRange, setSizeRange] = useState(idle.sizeRange);
  const [opacityRange, setOpacityRange] = useState(idle.opacityRange);

  useMotionValueEvent(sizeSpring, "change", setSize);
  useMotionValueEvent(gapYSpring, "change", setGapY);
  useMotionValueEvent(gapXSpring, "change", setGapX);
  useMotionValueEvent(strokeWidthSpring, "change", setStrokeWidth);
  useMotionValueEvent(sizeRangeSpring, "change", setSizeRange);
  useMotionValueEvent(opacityRangeSpring, "change", setOpacityRange);

  useEffect(() => {
    sizeSpring.set(isActive ? active.size : idle.size);
    gapYSpring.set(isActive ? active.gapY : idle.gapY);
    gapXSpring.set(isActive ? active.gapX : idle.gapX);
    strokeWidthSpring.set(isActive ? active.strokeWidth : idle.strokeWidth);
    sizeRangeSpring.set(isActive ? active.sizeRange : idle.sizeRange);
    opacityRangeSpring.set(isActive ? active.opacityRange : idle.opacityRange);
  }, [isActive]);

  return (
    <DotGrid
      size={size}
      gapY={gapY}
      gapX={gapX}
      strokeWidth={strokeWidth}
      sizeRange={sizeRange}
      opacityRange={opacityRange}
      shape={idle.shape}
      colorFill={idle.colorFill}
      colorStroke={idle.colorStroke}
      colorBack={idle.colorBack}
      style={idle.style}
    />
  );
}

function AnimatedDotOrbit({
  idle,
  active,
  isActive,
}: {
  idle: DotOrbitParams;
  active: DotOrbitParams;
  isActive: boolean;
}) {
  const scaleSpring = useSpring(idle.scale, SPRING);
  const sizeSpring = useSpring(idle.size, SPRING);
  const sizeRangeSpring = useSpring(idle.sizeRange, SPRING);
  const spreadingSpring = useSpring(idle.spreading, SPRING);
  const speedSpring = useSpring(idle.speed, SPRING);
  const stepsPerColorSpring = useSpring(idle.stepsPerColor, SPRING);
  const frameSpring = useSpring(idle.frame, SPRING);

  const [scale, setScale] = useState(idle.scale);
  const [size, setSize] = useState(idle.size);
  const [sizeRange, setSizeRange] = useState(idle.sizeRange);
  const [spreading, setSpreading] = useState(idle.spreading);
  const [speed, setSpeed] = useState(idle.speed);
  const [stepsPerColor, setStepsPerColor] = useState(idle.stepsPerColor);
  const [frame, setFrame] = useState(idle.frame);

  useMotionValueEvent(scaleSpring, "change", setScale);
  useMotionValueEvent(sizeSpring, "change", setSize);
  useMotionValueEvent(sizeRangeSpring, "change", setSizeRange);
  useMotionValueEvent(spreadingSpring, "change", setSpreading);
  useMotionValueEvent(speedSpring, "change", setSpeed);
  useMotionValueEvent(stepsPerColorSpring, "change", setStepsPerColor);
  useMotionValueEvent(frameSpring, "change", setFrame);

  useEffect(() => {
    scaleSpring.set(isActive ? active.scale : idle.scale);
    sizeSpring.set(isActive ? active.size : idle.size);
    sizeRangeSpring.set(isActive ? active.sizeRange : idle.sizeRange);
    spreadingSpring.set(isActive ? active.spreading : idle.spreading);
    speedSpring.set(isActive ? active.speed : idle.speed);
    stepsPerColorSpring.set(
      isActive ? active.stepsPerColor : idle.stepsPerColor,
    );
    frameSpring.set(isActive ? active.frame : idle.frame);
  }, [isActive]);

  return (
    <DotOrbit
      scale={scale}
      size={size}
      sizeRange={sizeRange}
      spreading={spreading}
      speed={speed}
      stepsPerColor={stepsPerColor}
      frame={frame}
      colors={idle.colors}
      colorBack={idle.colorBack}
      style={idle.style}
    />
  );
}

function AnimatedSpiral({
  idle,
  active,
  isActive,
}: {
  idle: SpiralParams;
  active: SpiralParams;
  isActive: boolean;
}) {
  const speedSpring = useSpring(idle.speed, SPRING);
  const densitySpring = useSpring(idle.density, SPRING);
  const distortionSpring = useSpring(idle.distortion, SPRING);
  const strokeWidthSpring = useSpring(idle.strokeWidth, SPRING);
  const strokeTaperSpring = useSpring(idle.strokeTaper, SPRING);
  const strokeCapSpring = useSpring(idle.strokeCap, SPRING);
  const noiseFrequencySpring = useSpring(idle.noiseFrequency, SPRING);
  const noiseSpring = useSpring(idle.noise, SPRING);
  const scaleSpring = useSpring(idle.scale, SPRING);
  const rotationSpring = useSpring(idle.rotation, SPRING);
  const softnessSpring = useSpring(idle.softness, SPRING);
  const offsetXSpring = useSpring(idle.offsetX, SPRING);
  const offsetYSpring = useSpring(idle.offsetY, SPRING);
  const frameSpring = useSpring(idle.frame, SPRING);

  const [speed, setSpeed] = useState(idle.speed);
  const [density, setDensity] = useState(idle.density);
  const [distortion, setDistortion] = useState(idle.distortion);
  const [strokeWidth, setStrokeWidth] = useState(idle.strokeWidth);
  const [strokeTaper, setStrokeTaper] = useState(idle.strokeTaper);
  const [strokeCap, setStrokeCap] = useState(idle.strokeCap);
  const [noiseFrequency, setNoiseFrequency] = useState(idle.noiseFrequency);
  const [noise, setNoise] = useState(idle.noise);
  const [scale, setScale] = useState(idle.scale);
  const [rotation, setRotation] = useState(idle.rotation);
  const [softness, setSoftness] = useState(idle.softness);
  const [offsetX, setOffsetX] = useState(idle.offsetX);
  const [offsetY, setOffsetY] = useState(idle.offsetY);
  const [frame, setFrame] = useState(idle.frame);

  useMotionValueEvent(speedSpring, "change", setSpeed);
  useMotionValueEvent(densitySpring, "change", setDensity);
  useMotionValueEvent(distortionSpring, "change", setDistortion);
  useMotionValueEvent(strokeWidthSpring, "change", setStrokeWidth);
  useMotionValueEvent(strokeTaperSpring, "change", setStrokeTaper);
  useMotionValueEvent(strokeCapSpring, "change", setStrokeCap);
  useMotionValueEvent(noiseFrequencySpring, "change", setNoiseFrequency);
  useMotionValueEvent(noiseSpring, "change", setNoise);
  useMotionValueEvent(scaleSpring, "change", setScale);
  useMotionValueEvent(rotationSpring, "change", setRotation);
  useMotionValueEvent(softnessSpring, "change", setSoftness);
  useMotionValueEvent(offsetXSpring, "change", setOffsetX);
  useMotionValueEvent(offsetYSpring, "change", setOffsetY);
  useMotionValueEvent(frameSpring, "change", setFrame);

  useEffect(() => {
    speedSpring.set(isActive ? active.speed : idle.speed);
    densitySpring.set(isActive ? active.density : idle.density);
    distortionSpring.set(isActive ? active.distortion : idle.distortion);
    strokeWidthSpring.set(isActive ? active.strokeWidth : idle.strokeWidth);
    strokeTaperSpring.set(isActive ? active.strokeTaper : idle.strokeTaper);
    strokeCapSpring.set(isActive ? active.strokeCap : idle.strokeCap);
    noiseFrequencySpring.set(
      isActive ? active.noiseFrequency : idle.noiseFrequency,
    );
    noiseSpring.set(isActive ? active.noise : idle.noise);
    scaleSpring.set(isActive ? active.scale : idle.scale);
    rotationSpring.set(isActive ? active.rotation : idle.rotation);
    softnessSpring.set(isActive ? active.softness : idle.softness);
    offsetXSpring.set(isActive ? active.offsetX : idle.offsetX);
    offsetYSpring.set(isActive ? active.offsetY : idle.offsetY);
    frameSpring.set(isActive ? active.frame : idle.frame);
  }, [isActive]);

  return (
    <Spiral
      speed={speed}
      density={density}
      distortion={distortion}
      strokeWidth={strokeWidth}
      strokeTaper={strokeTaper}
      strokeCap={strokeCap}
      noiseFrequency={noiseFrequency}
      noise={noise}
      scale={scale}
      rotation={rotation}
      softness={softness}
      offsetX={offsetX}
      offsetY={offsetY}
      frame={frame}
      colorBack={idle.colorBack}
      colorFront={idle.colorFront}
      style={idle.style}
    />
  );
}

// ─── ShaderRenderer dispatcher ────────────────────────────────────────────────

function ShaderRenderer({
  shader,
  isActive,
}: {
  shader: Card["shader"];
  isActive: boolean;
}) {
  const { idle, active } = shader;
  if (idle.type === "waves")
    return (
      <AnimatedWaves
        idle={idle}
        active={active as WavesParams}
        isActive={isActive}
      />
    );
  if (idle.type === "dotgrid")
    return (
      <AnimatedDotGrid
        idle={idle}
        active={active as DotGridParams}
        isActive={isActive}
      />
    );
  if (idle.type === "dotorbit")
    return (
      <AnimatedDotOrbit
        idle={idle}
        active={active as DotOrbitParams}
        isActive={isActive}
      />
    );
  if (idle.type === "spiral")
    return (
      <AnimatedSpiral
        idle={idle}
        active={active as SpiralParams}
        isActive={isActive}
      />
    );
  return null;
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  const shouldReduceMotion = useReducedMotion();

  const cards: Card[] = useMemo(
    () => [
      {
        title: "Intergalactic Highway",
        description:
          "Dive into the cosmos with deep blue hues, guiding the way through the design galaxies.",
        shader: {
          idle: {
            type: "waves",
            scale: 0.15,
            rotation: 340,
            frequency: 0.15,
            amplitude: 0.2,
            spacing: 1,
            proportion: 0.1,
            softness: 0,
            shape: 3,
            colorBack: "#00000000",
            colorFront: "#CCECFF",
            style: {
              alignSelf: "stretch",
              backgroundColor: "color(display-p3 0.175 0.237 0.500)",
              flexShrink: 0,
              height: "200px",
              width: "100%",
              transformOrigin: "50% 50%",
              borderRadius: "0.5rem",
            },
          },
          active: {
            type: "waves",
            scale: 1.15,
            rotation: 340,
            frequency: 0.4,
            amplitude: 0.45,
            spacing: 1,
            proportion: 0.1,
            softness: 0,
            shape: 3,
            colorBack: "#00000000",
            colorFront: "#CCECFF",
            style: {
              alignSelf: "stretch",
              backgroundColor: "color(display-p3 0.175 0.237 0.500)",
              flexShrink: 0,
              height: "200px",
              width: "100%",
              transformOrigin: "50% 50%",
              borderRadius: "0.5rem",
            },
          },
        },
        className: "bg-[oklch(38.6%_0.122_268.4)]",
        textColor: "text-[oklch(95.0%_0.122_267.9)]",
        config: {
          y: 84.67,
          x: -707,
          rotate: -15,
          zIndex: 1,
        },
      },
      {
        title: "Lily Pads & Swings",
        description:
          "A playful landscape merging nature's serenity with engineering's dynamic jumps.",
        shader: {
          idle: {
            type: "dotgrid",
            size: 5,
            gapY: 20,
            gapX: 20,
            strokeWidth: 7.5,
            sizeRange: 0.5,
            opacityRange: 0.5,
            shape: "circle",
            colorFill: "#002D0F",
            colorStroke: "#72B08B",
            colorBack: "#00000000",
            style: {
              alignSelf: "stretch",
              backgroundColor: "color(display-p3 0.058 0.173 0.072)",
              flexShrink: 0,
              height: "200px",
              transformOrigin: "50% 50%",
            },
          },
          active: {
            type: "dotgrid",
            size: 5,
            gapY: 20,
            gapX: 20,
            strokeWidth: 30,
            sizeRange: 0,
            opacityRange: 0.5,
            shape: "circle",
            colorFill: "#002D0F",
            colorStroke: "#72B08B",
            colorBack: "#00000000",
            style: {
              alignSelf: "stretch",
              backgroundColor: "color(display-p3 0.058 0.173 0.072)",
              flexShrink: 0,
              height: "200px",
              transformOrigin: "50% 50%",
            },
          },
        },
        className: "bg-[oklch(70.5%_0.084_157.2)]",
        textColor: "text-[oklch(25.0%_0.084_157.2)]",
        config: {
          y: 20,
          x: -420,
          rotate: 8,
          zIndex: 2,
        },
      },
      {
        title: "Mellow Melon Methods",
        description:
          "Warm pink tones evoking creativity and technique in the design process.",
        shader: {
          idle: {
            type: "waves",
            scale: 1,
            rotation: 90,
            frequency: 2,
            amplitude: 0.25,
            spacing: 1,
            proportion: 0.5,
            softness: 0,
            shape: 3,
            colorBack: "#00000000",
            colorFront: "#FFE8EA",
            style: {
              alignSelf: "stretch",
              backgroundColor: "color(display-p3 0.836 0.234 0.387)",
              flexShrink: 0,
              height: "200px",
              transformOrigin: "50% 50%",
            },
          },
          active: {
            type: "waves",
            scale: 3,
            rotation: 90,
            frequency: 2,
            amplitude: 0.25,
            spacing: 0.7,
            proportion: 0.6,
            softness: 0,
            shape: 2,
            colorBack: "#00000000",
            colorFront: "#FFE8EA",
            style: {
              alignSelf: "stretch",
              backgroundColor: "color(display-p3 0.836 0.234 0.387)",
              flexShrink: 0,
              height: "200px",
              transformOrigin: "50% 50%",
            },
          },
        },
        className: "bg-[oklch(60.6%_0.224_10.6)]",
        textColor: "text-[oklch(95.3%_0.031_10.7)]",
        config: {
          y: 133.91,
          x: -179,
          rotate: -5,
          zIndex: 3,
        },
      },
      {
        title: "Honeypad That Glows",
        description:
          "A sunny blend of yellow casts light on solutions with a honeyed warmth and ingenuity.",
        shader: {
          idle: {
            type: "dotorbit",
            scale: 0.4,
            size: 1,
            sizeRange: 0.5,
            spreading: 0.5,
            speed: 0,
            stepsPerColor: 1,
            frame: 49038.93600001137,
            colors: ["#8F5800", "#511D00"],
            colorBack: "#00000000",
            style: {
              alignSelf: "stretch",
              backgroundColor: "color(display-p3 0.905 0.715 0.348)",
              flexShrink: 0,
              height: "200px",
              transformOrigin: "50% 50%",
            },
          },
          active: {
            type: "dotorbit",
            scale: 0.2,
            size: 1,
            sizeRange: 0.2,
            spreading: 0.5,
            speed: 2,
            stepsPerColor: 1,
            frame: 49038.93600001137,
            colors: ["#8F5800", "#511D00"],
            colorBack: "#00000000",
            style: {
              alignSelf: "stretch",
              backgroundColor: "color(display-p3 0.905 0.715 0.348)",
              flexShrink: 0,
              height: "200px",
              transformOrigin: "50% 50%",
            },
          },
        },
        className: "bg-[oklch(80.6%_0.143_80)]",
        textColor: "text-[oklch(30.0%_0.143_79.6)]",
        config: {
          y: 80.85,
          x: 68,
          rotate: 12,
          zIndex: 4,
        },
      },
      {
        title: "The Heavy Orange Drift",
        description:
          "Bold orange embodies the powerful momentum and drive at the heart of fearless engineering.",
        shader: {
          idle: {
            type: "spiral",
            speed: 0,
            density: 0,
            distortion: 0,
            strokeWidth: 0.6,
            strokeTaper: 0,
            strokeCap: 0,
            noiseFrequency: 0.2,
            noise: 0.75,
            scale: 0.03,
            rotation: 200,
            softness: 0.05,
            offsetX: 0,
            offsetY: 0,
            frame: 33288.31900000164,
            colorBack: "#00000000",
            colorFront: "#FFE1D7",
            style: {
              alignSelf: "stretch",
              backgroundColor: "color(display-p3 0.840 0.321 0.219)",
              flexShrink: 0,
              height: "200px",
              transformOrigin: "50% 50%",
            },
          },
          active: {
            type: "spiral",
            speed: 1,
            density: 0.15,
            distortion: 0.7,
            strokeWidth: 0.5,
            strokeTaper: 0.1,
            strokeCap: 0,
            noiseFrequency: 1,
            noise: 0.4,
            scale: 1,
            rotation: 0,
            softness: 0.35,
            offsetX: 0,
            offsetY: 0,
            frame: 33288.31900000164,
            colorBack: "#00000000",
            colorFront: "#FFE1D7",
            style: {
              alignSelf: "stretch",
              backgroundColor: "color(display-p3 0.840 0.321 0.219)",
              flexShrink: 0,
              height: "200px",
              transformOrigin: "50% 50%",
            },
          },
        },
        className: "bg-[oklch(62.3%_0.204_32)]",
        textColor: "text-[oklch(95.0%_0.057_32)]",
        config: {
          y: 149.91,
          x: 363,
          rotate: -5,
          zIndex: 5,
        },
      },
    ],
    [],
  );

  const [active, setActive] = useState<Card | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const isCurrentActive = (card: Card) => {
    return active?.title === card.title;
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isCardClick = target.closest("[data-card]");
      if (!isCardClick) {
        setActive(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active) {
        e.preventDefault();
        setActive(null);
        return;
      }

      if (!active) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          const prevIndex = (selectedIndex - 1 + cards.length) % cards.length;
          setSelectedIndex(prevIndex);
          setActive(cards[prevIndex]);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          const nextIndex = (selectedIndex + 1) % cards.length;
          setSelectedIndex(nextIndex);
          setActive(cards[nextIndex]);
        }
        return;
      }

      const currentIndex = cards.findIndex(
        (card) => card.title === active.title,
      );

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
        setActive(cards[prevIndex]);
        setSelectedIndex(prevIndex);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % cards.length;
        setActive(cards[nextIndex]);
        setSelectedIndex(nextIndex);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, cards, selectedIndex]);

  const isAnyCardActive = () => {
    return active?.title;
  };

  const isSelected = (index: number) => {
    return !active && selectedIndex === index;
  };

  return (
    <div
      ref={ref}
      className="h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <div ref={cardsRef} className="max-w-5xl mx-auto w-full h-150 relative">
        {cards.map((card) => (
          <motion.div key={card.title}>
            <motion.button
              data-card
              onClick={() => setActive(card)}
              initial={{
                y: shouldReduceMotion ? card.config.y : 400,
                x: 0,
                scale: shouldReduceMotion ? 1 : 0.8,
                filter: shouldReduceMotion ? "blur(0px)" : "blur(10px)",
              }}
              animate={{
                y: isCurrentActive(card)
                  ? -100
                  : isAnyCardActive()
                    ? 300
                    : card.config.y,
                x: isCurrentActive(card)
                  ? -175
                  : isAnyCardActive()
                    ? card.config.x * 0.45
                    : card.config.x,
                rotate: isCurrentActive(card)
                  ? 0
                  : isAnyCardActive()
                    ? card.config.rotate * 0.4
                    : card.config.rotate,
                scale: isCurrentActive(card)
                  ? 1
                  : isAnyCardActive()
                    ? 0.7
                    : isSelected(cards.indexOf(card))
                      ? 1.03
                      : 1,
                width: isCurrentActive(card) ? 350 : 350,
                height: isCurrentActive(card) ? 500 : 500,
                filter: "blur(0px)",
              }}
              whileHover={{
                scale: isCurrentActive(card)
                  ? 1
                  : isAnyCardActive()
                    ? 0.75
                    : 1.05,
              }}
              whileTap={{
                scale: isCurrentActive(card) ? 1 : 0.95,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{
                zIndex: active?.config.zIndex,
              }}
              className={cn(
                "w-80 p-6 absolute top-0 left-1/2 flex flex-col justify-between items-start overflow-hidden rounded-3xl cursor-pointer",
                card.className,
                isSelected(cards.indexOf(card)),
              )}
            >
              <ShaderRenderer
                shader={card.shader}
                isActive={isCurrentActive(card)}
              />
              <div
                className={cn(
                  isAnyCardActive() && !isCurrentActive(card) && "mt-8",
                  isCurrentActive(card) && "mt-8",
                )}
              >
                <motion.h2
                  className={cn(
                    "text-[42px] leading-13 text-left font-['Brawler']",
                    card.textColor,
                  )}
                >
                  {card.title}
                </motion.h2>
                <AnimatePresence mode="popLayout">
                  {isAnyCardActive() && (
                    <motion.p
                      layoutId={card.title + "description"}
                      initial={{ opacity: 0, x: 20, y: 20, height: 0 }}
                      animate={{ opacity: 1, x: 0, y: 0, height: 100 }}
                      exit={{ opacity: 0, x: 40, y: 40, height: 0 }}
                      className={cn(
                        "text-lg mt-3 text-left font-['Brawler']",
                        card.textColor,
                      )}
                    >
                      {card.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default App;
