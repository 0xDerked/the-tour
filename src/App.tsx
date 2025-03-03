import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, IconButton, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import PersonIcon from "@mui/icons-material/Person";

const Header = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",
  width: "100%",
  backgroundColor: "rgba(44, 62, 80, 0.9)",
  color: "white",
  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  zIndex: 10,
  backdropFilter: "blur(5px)",
});

const GameArea = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "100vh",
  width: "100%",
  backgroundColor: "#2d5e2d", // More golf green color
  color: "white",
  position: "relative",
  backgroundImage: `
    radial-gradient(circle at 20% 30%, #3a7a3a 2%, transparent 2.5%),
    radial-gradient(circle at 40% 70%, #3a7a3a 2%, transparent 2.5%),
    radial-gradient(circle at 60% 20%, #3a7a3a 2%, transparent 2.5%),
    radial-gradient(circle at 80% 50%, #3a7a3a 2%, transparent 2.5%)
  `,
  backgroundSize: "300px 300px",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.1) 95%),
      linear-gradient(0deg, transparent 95%, rgba(255,255,255,0.1) 95%)
    `,
    backgroundSize: "20px 20px",
    pointerEvents: "none",
  },
});

// Tree component for decoration
const Tree = styled(Box)(() => ({
  position: "absolute",
  width: "30px",
  height: "60px",
  "&::before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "8px",
    height: "15px",
    backgroundColor: "#5D4037", // Tree trunk
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "15px",
    left: 0,
    width: "30px",
    height: "45px",
    backgroundColor: "#2E7D32", // Tree foliage
    borderRadius: "50% 50% 10% 10%",
  },
}));

// Sand trap component
const SandTrap = styled(Box)(() => ({
  position: "absolute",
  backgroundColor: "#E0C097",
  borderRadius: "50%",
  opacity: 0.7,
}));

const MapContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "calc(100vh - 70px)", // Subtract header height
  padding: "1rem",
});

interface LocationProps {
  top: string;
  left: string;
  width: string;
  height: string;
  isSquare?: boolean;
}

const Location = styled(Box)<LocationProps>(
  ({ top, left, width, height, isSquare = false }) => ({
    position: "absolute",
    top,
    left,
    width,
    height,
    border: "2px solid #3498db",
    borderRadius: isSquare ? "10px" : "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: "rgba(52, 152, 219, 0.1)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    backdropFilter: "blur(3px)",
    "&:hover": {
      backgroundColor: "rgba(52, 152, 219, 0.3)",
      transform: "scale(1.02)",
      boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
    },
  })
);

const LocationText = styled(Typography)({
  textAlign: "center",
  fontWeight: "bold",
  textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
});

// Clubhouse component with house shape
const Clubhouse = styled(Box)<{ top: string; left: string; width: string }>(
  ({ top, left, width }) => ({
    position: "absolute",
    top,
    left,
    width,
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.02)",
      "& .roof::before": {
        backgroundColor: "rgba(52, 152, 219, 0.3)",
      },
      "& .building": {
        backgroundColor: "rgba(52, 152, 219, 0.3)",
      },
    },
  })
);

const ClubhouseRoof = styled(Box)({
  position: "relative",
  width: "100%",
  height: "0",
  paddingBottom: "20%", // Smaller triangle
  backgroundColor: "transparent",
  overflow: "visible",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 152, 219, 0.1)",
    backdropFilter: "blur(3px)",
    clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "2px solid #3498db",
    borderBottom: "none",
    clipPath: "polygon(-1px 100%, 50% -1px, 101% 100%)", // Slightly larger to show border
    pointerEvents: "none",
  },
});

const ClubhouseBuilding = styled(Box)({
  width: "100%",
  height: "0",
  paddingBottom: "30%", // Much shorter building
  backgroundColor: "rgba(52, 152, 219, 0.1)",
  backdropFilter: "blur(3px)",
  border: "2px solid #3498db", // Blue outline
  borderTopWidth: "0", // Remove top border to avoid double border with roof
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  position: "relative",
});

const ClubhouseText = styled(Typography)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  fontWeight: "bold",
  textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
  width: "100%",
});

// Modify the puttingGreenStyles object to remove hole styles
const puttingGreenStyles = {
  container: {
    position: "relative" as const,
    width: "100%",
    height: "100%", // Changed from 300px to 100% to fill parent
    backgroundColor: "#7baf6e",
    borderRadius: "50%",
    boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
  },
  grass: {
    position: "absolute" as const,
    width: "100%",
    height: "100%",
    backgroundImage:
      "linear-gradient(0deg, #7baf6e 49%, #8bbe7c 50%, #7baf6e 51%)",
    backgroundSize: "10px 10px",
    opacity: 0.7,
  },
  flag: {
    position: "absolute" as const,
    width: "2px",
    height: "30px",
    backgroundColor: "#fff",
  },
  flagTop: {
    position: "absolute" as const,
    width: "15px",
    height: "10px",
    backgroundColor: "red",
  },
  text: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center" as const,
    fontWeight: "bold",
    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
    zIndex: 2,
  },
};

// Modify the component to only include flags
const FlagOnly = ({ left, top }: { left: number; top: number }) => (
  <div
    style={{ position: "absolute" as const, left: `${left}%`, top: `${top}%` }}
  >
    <div style={puttingGreenStyles.flag}></div>
    <div style={puttingGreenStyles.flagTop}></div>
  </div>
);

// Update the PuttingGreen component to include the text
const PuttingGreen = () => (
  <div style={puttingGreenStyles.container}>
    <div style={puttingGreenStyles.grass}></div>
    <FlagOnly left={20} top={30} />
    <FlagOnly left={80} top={40} />
    <Typography
      variant="h5"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        fontWeight: "bold",
        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
        zIndex: 2,
      }}
    >
      Putting Green
    </Typography>
  </div>
);

function App() {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <GameArea>
      <Header>
        <IconButton color="inherit" size="large">
          <PersonIcon fontSize="large" />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          The Tour
        </Typography>
        <Box>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <VolumeOffIcon fontSize="large" />
            ) : (
              <VolumeUpIcon fontSize="large" />
            )}
          </IconButton>
          <IconButton color="inherit" size="large">
            <SettingsIcon fontSize="large" />
          </IconButton>
        </Box>
      </Header>

      <MapContainer>
        {/* Decorative Trees */}
        <Tree sx={{ top: "15%", left: "5%", transform: "scale(1.2)" }} />
        <Tree sx={{ top: "10%", left: "8%", transform: "scale(0.9)" }} />
        <Tree sx={{ top: "12%", left: "12%", transform: "scale(1.1)" }} />
        <Tree sx={{ top: "20%", right: "5%", transform: "scale(1.3)" }} />
        <Tree sx={{ top: "15%", right: "9%", transform: "scale(0.8)" }} />
        <Tree sx={{ top: "18%", right: "12%", transform: "scale(1)" }} />
        <Tree sx={{ bottom: "15%", left: "7%", transform: "scale(1.1)" }} />
        <Tree sx={{ bottom: "10%", left: "12%", transform: "scale(0.9)" }} />
        <Tree sx={{ bottom: "20%", right: "8%", transform: "scale(1.2)" }} />
        <Tree sx={{ bottom: "15%", right: "12%", transform: "scale(1)" }} />

        {/* Sand Traps */}
        <SandTrap
          sx={{ top: "45%", left: "45%", width: "80px", height: "50px" }}
        />
        <SandTrap
          sx={{ bottom: "30%", right: "20%", width: "60px", height: "40px" }}
        />
        <SandTrap
          sx={{ top: "60%", left: "20%", width: "50px", height: "30px" }}
        />

        {/* Clubhouse - house shape at top center */}
        <Clubhouse top="5%" left="37%" width="20%">
          <ClubhouseRoof className="roof" />
          <ClubhouseBuilding className="building">
            <ClubhouseText variant="h5">Clubhouse</ClubhouseText>
          </ClubhouseBuilding>
        </Clubhouse>

        {/* Driving Range - oval at bottom left */}
        <Location top="40%" left="10%" width="30%" height="20%">
          <LocationText variant="h5">Driving Range</LocationText>
        </Location>

        {/* Putting Green - oval at top right */}
        <Location
          top="30%"
          left="60%"
          width="25%"
          height="15%"
          sx={{ border: "3px solid white" }}
        >
          <PuttingGreen />
        </Location>

        {/* Bunker Practice - oval at mid-right */}
        <Location top="55%" left="55%" width="25%" height="15%">
          <LocationText variant="h5">Bunker Practice</LocationText>
        </Location>

        {/* Practice Course - larger oval at bottom */}
        <Location top="70%" left="25%" width="50%" height="25%">
          <LocationText variant="h5">Practice Course</LocationText>
        </Location>
      </MapContainer>
    </GameArea>
  );
}

export default App;
