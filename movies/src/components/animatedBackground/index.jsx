import Box from "@mui/material/Box";
import { keyframes } from "@mui/system";

const floatOne = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(120px, 60px) scale(1.15);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
`;

const floatTwo = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-100px, 80px) scale(1.2);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
`;

const floatThree = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(80px, -80px) scale(1.15);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
`;

const AnimatedBackground = ({ mode }) => {
  if (mode !== "dark") return null;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        backgroundColor: "#09090D",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 520,
          height: 520,
          top: "-10%",
          left: "-5%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(157, 78, 221, 0.5) 0%, rgba(157, 78, 221, 0) 70%)",
          filter: "blur(35px)",
          animation: `${floatOne} 9s ease-in-out infinite`,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 600,
          height: 600,
          top: "25%",
          right: "-10%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(123, 44, 191, 0.42) 0%, rgba(123, 44, 191, 0) 70%)",
          filter: "blur(45px)",
          animation: `${floatTwo} 11s ease-in-out infinite`,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 550,
          height: 550,
          bottom: "-15%",
          left: "30%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(199, 125, 255, 0.34) 0%, rgba(199, 125, 255, 0) 70%)",
          filter: "blur(40px)",
          animation: `${floatThree} 10s ease-in-out infinite`,
        }}
      />
    </Box>
  );
};

export default AnimatedBackground;